import jsonwebtoken from "jsonwebtoken";

export const generateAccessToken = (id) => {
  const payload = { id };
  return jsonwebtoken.sign(payload, "secret", { expiresIn: "24h" });
};
