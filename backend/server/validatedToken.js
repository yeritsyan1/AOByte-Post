import jsonwebtoken from "jsonwebtoken";

const validatedToken = async (req, res, next) => {
  const token = req.headers.token;
  try {
    await jsonwebtoken.verify(token.substring(1, token.length - 1), "secret");
    next();
  } catch {
    return null;
  }
};

export default validatedToken;
