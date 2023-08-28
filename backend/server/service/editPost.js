import Post from "../../models/Post.js";

export const editPost = async (req, res) => {
  const { _id, title, body, category } = req.headers;
  try {
    const updateResult = Post.updateOne(
      { _id },
      {
        $set: {
          title,
          body,
          category,
        },
      }
    ).exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post not found or no changes made" });
    } else {
      res.status(400).json({ message: "Post updated successfull" });
    }
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};
