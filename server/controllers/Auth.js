const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Entered the required Filled",
      });
    }
    const checkExisting = await User.findOne({ email });
    if (checkExisting) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }
    const saltRound = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRound);

    const user = await User.create({
      email,
      password: encryptedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "Account created Successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Entered the required Filled",
      });
    }
    const user = await User.findOne({ email });

    if (user) {
      const hashPassword = user.password;
      if (await bcrypt.compare(password, hashPassword)) {
        const payload = {
          id: user._id,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        user.token = token;
        user.password = undefined;

        const options = {
          expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
          httpOnly: true, // Cookie accessible only via HTTP(S)
          // secure: process.env.NODE_ENV === "production", // HTTPS-only in production
          sameSite: "strict", // Protects against CSRF
        };

        res.cookie("token", token, options).status(200).json({
          success: true,
          message: "Login successful",
          user,
          token,
        });
      } else {
        return res.status(409).json({
          success: false,
          message: "password doesn't match",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User email not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid server error",
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, country, gender, image, email } = req.body;

    const user = await User.findById(userId);
    if (!user || !firstName || !lastName || !country || !gender || !image) {
      return res.status(404).json({
        success: false,
        message: "Details not found",
      });
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName,
          lastName,
          country,
          gender,
          image,
          email,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User updated not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Profile Update Successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: "Invalid server error",
    });
  }
};
