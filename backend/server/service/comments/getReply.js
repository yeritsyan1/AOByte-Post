import Reply from "../../../models/Reply.js";

export const reply = (req, res) => {
  try {
    Reply.find().then((reply) => res.json(reply));
  } catch (err) {
    res.status(400).json({ message: "Failed to load." });
  }
};
