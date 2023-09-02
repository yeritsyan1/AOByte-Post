import jsonwebtoken from "jsonwebtoken";
import { generateAccessToken } from "../../../accessToken.js";

export const refreshToken = async (req, res) => {
  const { token, tokenrefresh } = req.headers;
  try {
    const decodedToken = await jsonwebtoken.decode(token);
    const decodedRefreshToken = await jsonwebtoken.decode(tokenrefresh);

    if (decodedRefreshToken.exp * 1000 > Date.now()) {
      if (decodedToken?.exp * 1000 < Date.now()) {
        const newToken = generateAccessToken(decodedToken.id);
        res.status(200).json({ newToken });
      }
    } else {
      res.status(200).json({ logOut: true });
    }
  } catch (error) {
    res.status(400).json({ err: "Something went wrong." });
  }
};
