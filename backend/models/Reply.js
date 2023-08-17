import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  author: { type: Object },
  body: { type: String },
  date: { type: Number },
  rate: { type: Number },
  replies: { type: Array },
  parentId: { type: String || null },
  idReplyParent: { type: String || null },
});

const Reply = mongoose.model("reply", replySchema);

export default Reply;
