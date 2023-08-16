import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: { type: Object },
  title: { type: String },
  body: { type: String },
  comments: { type: Array },
  category: { type: String },
  date: { type: Number },
  rate: { type: Number },
  likedUser: { type: Array },
  isActive: { type: Boolean },
});

const Post = mongoose.model("post", postSchema);

export default Post;
