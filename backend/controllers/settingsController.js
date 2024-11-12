const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailChangeModel = require("../models/emailChangeModel");

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Access token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.AUTH_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid Credentials",
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const changeEmailRequest = async (req, res, next) => {
  try {
    const { newEmail, reason } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Access token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.AUTH_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    await emailChangeModel.create({
      newEmail,
      reason,
      user: user._id,
    });

    res.status(200).json({
      message: "Email change request sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changePassword,
  changeEmailRequest,
};
