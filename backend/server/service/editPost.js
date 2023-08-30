import Post from "../../models/Post.js";

export const editPost = async (req, res) => {
  const { _id, title, body, category } = req.headers;
  try {
    const updateResult = Post.find({ _id })
      .updateOne(
        { _id },
        {
          $set: {
            title,
            body,
            category,
          },
        }
      )
      .exec();
    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(400).json({ message: "updated" });
    }
  } catch {
    res.status(400).json({ message: "Something went wrong" });
  }
};
