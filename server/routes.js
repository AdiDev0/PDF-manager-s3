import express from 'express';
import mongoose from 'mongoose';
import pdfModel from './pdfDocument.js';
import UserModal from './user.js'
import commentModal from './comments.js'
import auth from './auth.js'
import multer from 'multer';
import fs from 'fs';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


const app = express();
const router = express.Router();
dotenv.config()

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

// fetches all the data from mongoDB for Dashboard
router.get('/', async (req, res) => {
    try {
        const pdfDocument = await pdfModel.find();

        res.status(200).json(pdfDocument);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.get('/getName/:id', async (req, res) => {
    const { id } = req.body;
    try {
        const pdfDocument = await pdfModel.findById(id);

        res.status(200).json(pdfDocument);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


const upload = multer({ storage: multer.memoryStorage() })

//Route to upload the PDF
router.post('/upload', upload.single('file'), async (req, res) => {
    const { name, description, email } = req.body

    const file = req.file;

    const awsName = `${Date.now()}-${req.file.originalname}`

    const newpdfDocument = new pdfModel({ name, description, file, awsName, email });
    console.log(newpdfDocument)


    const params = {
        Bucket: bucketName,
        Key: awsName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    const command = new PutObjectCommand(params)

    await s3.send(command)

    await newpdfDocument.save()

    res.status(201).json(newpdfDocument);

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const pdfData = await pdfModel.findById(id);

    const { awsName } = pdfData;
    const params = {
        Bucket: bucketName,
        Key: awsName
    };

    const command = new DeleteObjectCommand(params);

    await s3.send(command);

    await pdfModel.findByIdAndRemove(id);

    res.json({ message: "Data deleted successfully." });
})


router.get('/pdf/:id', async (req, res) => {
    const { id } = req.params;

    const pdfData = await pdfModel.findById(id);

    if (!pdfData) {
        return res.status(404).json({ message: 'Document not found' });
    }

    const { awsName } = pdfData;

    const params = {
        Bucket: bucketName,
        Key: awsName
    };

    const command = new GetObjectCommand(params);
    const response = await s3.send(command);
    const pdfContent = response.Body;

    // this is used to save pdf locally
    // const writeStream = fs.createWriteStream('output.pdf');
    // pdfContent.pipe(writeStream);


    // Read the stream and convert it to a buffer
    const chunks = [];
    pdfContent.on('data', (chunk) => {
        chunks.push(chunk);
    });

    pdfContent.on('end', () => {
        const buffer = Buffer.concat(chunks);

        // Send the buffer as a response to the frontend
        res.setHeader('Content-Type', 'application/pdf');
        res.send(buffer);
    });

    // res.json({ message: " successfully." });
});

router.get('/pdf/getLink/:id', async (req, res) => {
    const { id } = req.params;

    const pdfData = await pdfModel.findById(id);

    if (!pdfData) {
        return res.status(404).json({ message: 'Document not found' });
    }
    const { awsName } = pdfData;

    const params = {
        Bucket: bucketName,
        Key: awsName,
    };

    const command = new GetObjectCommand(params);
    const response = await s3.send(command);
    console.log(response)
    const url = await getSignedUrl(s3, command, { expiresIn: 120 * 3600 });
    res.send(url)

})

const secret = 'test';

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)


    const oldUser = await UserModal.findOne({ email });
    console.log(oldUser)

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    // const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    // console.log(isPasswordCorrect)
    // // if (!isPasswordCorrect){
    // //   alert("invalid");
    // // }
    // // if (!isPasswordCorrect) return (
    // if (password !== oldUser.password) return (
    //     windows.alert("Invalid credentials"),
    //     res.status(400).json({ message: "Invalid credentials" }));

    // const token = jwt.sign({ email: oldUser.email, id: oldUser._id, name: oldUser.name }, secret, { expiresIn: "1h" });
    // res.status(200).json({ result: oldUser, token });
    let bool = bcrypt.compareSync(password, oldUser.password);
    if(bool){
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id, name: oldUser.name }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });
    }
    else{
        res.status(400).json({ message: "Invalid credentials" })
    }
    

    
})

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id, name: `${firstName} ${lastName}` }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
})


router.get('/comments', async (req, res) => {
    try {
        const comments = await commentModal.find();

        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.post('/submitComment', async (req, res) => {
    const { pdfid, author, comment } = req.body;
    console.log(req.body)
    try {
        const newComment = new commentModal({ author, comment, pdfId: pdfid });
        await newComment.save()
        res.json(newComment);
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteComment/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const comment = await commentModal.findById(id);

    await commentModal.findByIdAndRemove(id);

    res.json({ message: "Comment deleted successfully." });
})

export default router;