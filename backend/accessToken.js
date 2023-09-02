import jsonwebtoken from "jsonwebtoken";

export const generateAccessToken = (id) => {
  const payload = { id };
  return jsonwebtoken.sign(payload, "secret", { expiresIn: "24h" });
};

export const refreshToken = (id) => {
  const payload = { id };
  return jsonwebtoken.sign(payload, "refresh-token", { expiresIn: "7d" });
};
