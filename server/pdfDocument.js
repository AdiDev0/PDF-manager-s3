import mongoose from 'mongoose';


const documentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: { 
      type: String, 
      required: true 
    },
    description: {
      type: String,
      required: true
    },
    file: {
      type: Object, 
      required: true
    },
    awsName: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

const pdfDocument = mongoose.model('pdfDocument', documentSchema);

export default pdfDocument;

