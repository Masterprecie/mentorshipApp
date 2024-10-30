const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Access token is required",
      });
    }

    const decode = jwt.verify(token, process.env.AUTH_KEY);
    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const {
      password,
      otp,
      otpExpires,
      otpPurpose,
      refreshToken,
      __v,
      ...userProfile
    } = user.toObject();

    res.status(200).json({
      user: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
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

    const { password, email, ...updateData } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      decoded.id,
      {
        $set: updateData,
      },
      { new: true, runValidators: true }
    );

    const {
      password: pwd,
      otp,
      otpExpires,
      otpPurpose,
      refreshToken,
      __v,
      ...userProfile
    } = updatedUser.toObject();

    res.status(200).send({
      user: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  getProfile,
};
