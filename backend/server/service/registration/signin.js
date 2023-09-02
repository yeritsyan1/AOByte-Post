import { generateAccessToken, refreshToken } from "../../../accessToken.js";
import User from "../../../models/User.js";
import bcryptjs from "bcryptjs";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `'${email}' not found.`, statusCode: 400 });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = await generateAccessToken(user._id);
    const tokenRefresh = await refreshToken(user.id);
    user = await User.findOne({ email }).select("-password");
    return res.status(200).json({ message: "", user, token, tokenRefresh });
  } catch (err) {
    res.status(400).json({ message: "Login error" });
  }
};
