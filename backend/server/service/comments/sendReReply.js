import Reply from "../../../models/Reply.js";

export const sendReReply = async (req, res) => {
  const { author, body, date, rate, replies, parentId, idReplyParent } =
    req.body;

  try {
    const reply = new Reply({
      author,
      body,
      date,
      rate,
      replies,
      parentId,
      idReplyParent,
    });
    const saveReply = await reply.save();
    res.json({ message: "Send reply" });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong." });
  }
};
