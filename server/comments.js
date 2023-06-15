
import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: { type: String, required:  true },
  comment: {type: String, required: true},
  pdfId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("comment", commentSchema);