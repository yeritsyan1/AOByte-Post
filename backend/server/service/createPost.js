import Post from "../../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const {
      author,
      title,
      body,
      comments,
      category,
      rate,
      date,
      isActive,
      imgList,
    } = req.body;

    const newPost = new Post({
      author,
      title,
      body,
      comments,
      category,
      date,
      rate,
      isActive,
      imgList,
    });
    const post = await newPost.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(400).json({ message: "Failed to add post." });
  }
};
