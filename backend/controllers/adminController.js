const userModel = require("../models/userModel");

const getAllMentees = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;

    const options = {
      page,
      limit,
      select:
        "-password -otp -otpExpires -otpPurpose -refreshToken -isEmailVerified",
    };

    const query = { role: "mentee" };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { expertise: { $regex: search, $options: "i" } },
        { yearsOfExperience: { $regex: search, $options: "i" } },
      ];
    }

    const mentees = await userModel.paginate(query, options);

    if (mentees.docs.length === 0) {
      return res.status(404).send({
        message: "No user found",
      });
    }

    res.status(200).json(mentees);
  } catch (error) {
    next(error);
  }
};

const getAMentee = async (req, res, next) => {
  try {
    const { menteeId } = req.params;

    const mentee = await userModel.findOne({ _id: menteeId });

    if (!mentee) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).json(mentee);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMentees,
  getAMentee,
};
