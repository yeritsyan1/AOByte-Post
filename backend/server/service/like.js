import Post from "../../models/Post.js";

export const like = async (req, res) => {
  const { rate, _id, likedUser } = req.body;

  try {
    const updateResult = await Post.updateOne(
      { _id: _id },
      { $addToSet: { likedUser }, $set: { rate } }
    ).exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
};
