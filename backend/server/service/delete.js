import Post from "../../models/Post.js";

export const deletePost = async (req, res) => {
  const { _id } = req.headers;
  try {
    await Post.deleteOne({ _id });
    res.status(200).json({ message: "Post deleted" });
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};
