import User from "../../models/User.js";

export const updateVerify = (req, res) => {
  const { _id } = req.body.user;

  try {
    const updateResult = User.find({ _id })
      .updateOne(
        { _id },
        {
          $set: {
            isEmailVerify: true,
          },
        }
      )
      .exec();

    if (updateResult.nModified === 1) {
      res.status(200).json({ message: "Email verified" });
    } else {
      res.status(400).json({ message: "Verified" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
