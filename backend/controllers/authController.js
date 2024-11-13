const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailUtils");
const { generateOTP } = require("../utils/helpers");
const generateWelcomeEmail = require("../utils/welcomeMessage");
const tokenModel = require("../models/tokenModel");

const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      interest,
      age,
      gender,
      yearsOfExperience,
      profilePictureURL,
      about,
      linkedinUrl,
      expertise,
    } = req.body;

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      interest,
      age,
      gender,
      yearsOfExperience,
      profilePictureURL,
      about,
      linkedinUrl,
      expertise,
    });

    await tokenModel.create({
      userId: newUser._id,
      otp,
      otpExpires,
      otpPurpose: "verify-email",
    });

    const emailBody = generateWelcomeEmail(firstName, otp);
    await sendEmail(email, "Welcome to Me2Mentor", emailBody);

    res.status(201).send({
      isEmailVerified: false,
      message: "User created successfully. Please verify your email",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const token = await tokenModel.findOne({
      userId: user._id,
      otp,
      otpPurpose: "verify-email",
    });

    if (!token || token.otpExpires < Date.now()) {
      return res.status(400).send({
        message: "Invalid or expired OTP",
      });
    }

    user.isEmailVerified = true;
    await user.save();

    await tokenModel.deleteOne({ _id: token._id });

    res.status(200).send({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }
    if (!user.isEmailVerified) {
      return res.status(400).send({
        message:
          "Email not verified. Please verify your email before logging in.",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.AUTH_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    );

    await tokenModel.create({
      userId: user._id,
      refreshToken,
    });

    res.status(200).send({
      message: "Login successful",
      accessToken: token,
      refreshToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).send({
        message: "Email is already verified",
      });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Delete any existing OTP tokens for the user
    await tokenModel.deleteMany({
      userId: user._id,
      otpPurpose: "verify-email",
    });

    // Create a new OTP token
    await tokenModel.create({
      userId: user._id,
      otp,
      otpExpires,
      otpPurpose: "verify-email",
    });

    // Send the OTP to the user's email
    await sendEmail(
      email,
      "Resend OTP",
      `Dear ${user.firstName}, your OTP code is: ${otp}. It expires in 10 minutes.`
    );

    res.status(200).send({
      message: "OTP resent successfully",
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const userToken = await tokenModel.findOne({ refreshToken });

    if (!userToken) {
      return res.status(400).send({
        message: "Invalid refresh token",
      });
    }

    const user = await userModel.findById(userToken.userId);

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.AUTH_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({
      message: "Token refreshed successfully",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(
      email,
      "Password Reset",
      `Dear ${user.firstName}, Your OTP code is: ${otp}. It expires in 10mins.`
    );

    res.status(200).send({
      message: "OTP sent successfully, please check your email",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { otp, newPassword } = req.body;
    const user = await userModel.findOne({
      otp,
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid OTP",
      });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).send({
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  verifyEmail,
  login,
  resendOTP,
  refreshToken,
  forgetPassword,
  resetPassword,
};
