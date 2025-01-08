"use strict";

// Load environment variables from the .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// you can add more routes here

// const testSave = async () => {
//   const newUser = new User({
//     email: "test@example.com",
//     password: "testPassword123",
//     firstname: "Test",
//     lastname: "User",
//   });

//   try {
//     const savedUser = await newUser.save();
//     console.log("User saved:", savedUser);
//   } catch (error) {
//     console.error("Error saving user:", error);
//   }
// };

// testSave();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
