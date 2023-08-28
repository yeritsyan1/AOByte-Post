import Post from "../../models/Post.js";

export const isAcitve = async (req, res) => {
  const { isActive, _id } = req.body;
  try {
    const updateResult = await Post.updateOne(
      { _id: _id },
      { $set: { isActive: isActive } }
    ).exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post updated successfully " });
    } else {
      res.status(404).json({ message: "Post not found or no changes made" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
