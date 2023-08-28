import Post from "../../models/Post.js";

export const onePost = async (req, res) => {
  try {
    await Post.find({ _id: req.body.id }).then((post) => {
      return res.status(200).json(post);
    });
  } catch {
    return;
  }
};
