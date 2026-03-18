const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) throw new CustomError("Please provide name", 400);
    if (!email) throw new CustomError("Please provide email", 400);
    if (!password) throw new CustomError("Please provide password", 400);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError("Email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Please provide email and password", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};