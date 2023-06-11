import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from "./routes.js";
import dotenv from 'dotenv'




const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors());
app.use(routes)


const password = encodeURIComponent(process.env.DATABASE_PASSWORD);



const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://adityapdf:${password}@pdfcluster.n4rm69m.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));





