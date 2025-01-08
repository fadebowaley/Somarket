require("dotenv").config(); 

const config = {
  jwtSecret: process.env.JWT_SECRET || "fallback-secret-key",
  tokenExpiry: process.env.JWT_EXPIRY || "24h",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/newopB",
};


module.exports = config;
