const jwt = require('jsonwebtoken');
const { jwtSecret, tokenExpiry } = require("../config");


function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: tokenExpiry }
  );
}


function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
}


async function verifyToken(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }

  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(401).json({ error: `Access denied: ${message}` });
  }
}

module.exports = { generateToken, verifyToken };
