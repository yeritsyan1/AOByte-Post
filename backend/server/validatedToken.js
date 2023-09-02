import jsonwebtoken from "jsonwebtoken";

const validatedToken = async (req, res, next) => {
  const token = req.headers.token;
  try {
    await jsonwebtoken.verify(token, "secret");
    next();
  } catch {
    return null;
  }
};

export default validatedToken;
