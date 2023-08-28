import Comment from "../../../models/Comments.js";

export const sendComment = async (req, res) => {
  const { author, body, date, rate, postId } = req.body;

  try {
    const comment = new Comment({
      author,
      body,
      date,
      rate,
      postId,
    });
    await comment.save();
    res.json({ message: "Send" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong." });
  }
};
