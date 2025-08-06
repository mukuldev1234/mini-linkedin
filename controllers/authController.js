const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  const { name, email, password, bio } = req.body;
  try {
    const user = await User.create({ name, email, password, bio });
    const token = createToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, bio: user.bio } });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = createToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, bio: user.bio } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
