import bcryptjs from "bcryptjs";
import User from "../../../models/User.js";

export const signup = async (req, res) => {
  try {
    const { email, password, isEmailVerify } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    const hashPassword = bcryptjs.hashSync(password, 7);
    const newUser = new User({ email, password: hashPassword, isEmailVerify });
    await newUser.save();
    res
      .status(200)
      .json({ message: "Congratulations your account has been created!" });
  } catch {
    res.status(400).send("Sign up error");
  }
};
