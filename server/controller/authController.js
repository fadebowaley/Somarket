const User = require("../models/User");
const { generateToken } = require("../utils/auth");

const authController = {
  // Register user
  registerUser: async (req, res) => {
    try {
      const { email, password, firstname, lastname } = req.body;
      console.log(req.body);



      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }


      // Create and save the new user
      const user = new User({ email, password, firstname, lastname});
      await user.save();
      console.log("user saved", user);

      // Generate token
      const token = generateToken(user);
      console.log("token", token);
      res
        .status(201)
        .json({ token, user: { id: user._id, email, firstname, lastname } });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate token
      const token = generateToken(user);

      res.json({ token, user: { id: user._id, email, name: user.firstname } });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = authController;
