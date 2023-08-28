import Comment from "../../../models/Comments.js";

export const comments = async (req, res) => {
  try {
    Comment.find().then((comments) => res.json(comments));
  } catch (err) {
    res.status(400).json({ message: "Failed to load." });
  }
};
