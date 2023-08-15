import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: { type: Object },
  body: { type: String },
  date: { type: String },
  rate: { type: Number },
  postId: { type: String },
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
