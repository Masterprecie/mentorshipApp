const emailChangeModel = require("../models/emailChangeModel");
const notificationModel = require("../models/notificationModel");
const userModel = require("../models/userModel");
const sendEmail = require("../utils/emailUtils");

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

const verifyMentorId = async (req, res, next) => {
  try {
    const { mentorId } = req.body;

    const mentor = await userModel.findOne({ _id: mentorId });

    if (!mentor) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    mentor.idCardStatus = "verified";
    mentor.isProfileComplete = true;
    await mentor.save();
    await notificationModel.create({
      userId: mentorId,
      title: "Approved ID Card",
      message: `Your ID Card was Approved.`,
    });

    res.status(200).json({
      message: "Mentor verified successfully",
      mentor,
    });
  } catch (error) {
    next(error);
  }
};

const declineMentorId = async (req, res, next) => {
  try {
    const { mentorId, reason } = req.body;

    const mentor = await userModel.findOne({ _id: mentorId });

    if (!mentor) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    mentor.idCardStatus = "declined";
    mentor.declinedIdReason = reason;
    mentor.isProfileComplete = false;
    await mentor.save();

    await notificationModel.create({
      userId: mentorId,
      title: "Declined ID Card",
      message: `Your ID Card was declined. Reason: ${reason}`,
    });

    res.status(200).json({
      message: "ID Card Declined successfully",
      mentor,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEmailRequest = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const options = {
      page,
      limit,
    };

    const emailRequest = await emailChangeModel.paginate({}, options);

    if (emailRequest.docs.length === 0) {
      return res.status(404).send({
        message: "No email request found",
      });
    }

    res.status(200).json(emailRequest);
  } catch (error) {
    next(error);
  }
};

const changeUserEmail = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newEmail } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        message: "User not Found",
      });
    }

    const existingUser = await userModel.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).send({
        message: "Email is already in use",
      });
    }

    const oldEmail = user.email;
    user.email = newEmail;
    await user.save();

    await sendEmail(
      newEmail,
      "Email Changed Successfully",
      `Dear ${user.firstName}, your email has been successfully changed from ${oldEmail} to ${newEmail}.`
    );

    await notificationModel.create({
      userId: userId,
      title: "Email Changed",
      message: `Your email has been successfully changed from ${oldEmail} to ${newEmail}.`,
    });

    res.status(200).json({
      message: "Email changed successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getMentorMenteeStats = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();
    // Get total number of mentors and mentees
    const totalMentors = await userModel.countDocuments({ role: "mentor" });
    const totalMentee = await userModel.countDocuments({ role: "mentee" });

    // Get monthly counts for mentors and mentees
    const mentorCounts = await userModel.aggregate([
      {
        $match: {
          role: "mentor",
          createdAt: { $gte: new Date(`${currentYear}-01-01`) },
        },
      },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const menteeCounts = await userModel.aggregate([
      {
        $match: {
          role: "mentee",
          createdAt: { $gte: new Date(`${currentYear}-01-01`) },
        },
      },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Calculate percentage increase for each month

    const calculatePercentageIncrease = (counts) => {
      const percentageIncrease = [];
      for (let i = 1; i < counts.length; i++) {
        const previousCount = counts[i - 1].count;
        const currentCount = counts[i].count;
        const increase = ((currentCount - previousCount) / previousCount) * 100;
        percentageIncrease.push({
          month: counts[i]._id,
          percentageIncrease: increase.toFixed(2),
        });
      }
      return percentageIncrease;
    };
    const mentorPercentageIncrease = calculatePercentageIncrease(mentorCounts);
    const menteePercentageIncrease = calculatePercentageIncrease(menteeCounts);
    res.status(200).json({
      totalMentors,
      totalMentee,
      mentorCounts,
      menteeCounts,
      mentorPercentageIncrease,
      menteePercentageIncrease,
    });
  } catch (error) {
    next(error);
  }
};

const getMonthlyAnalytics = async (req, res, next) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({
        message: "Year is required",
      });
    }

    const selectedYear = parseInt(year, 10);

    if (isNaN(selectedYear)) {
      return res.status(400).json({ message: "Invalid year parameter" });
    }

    // Get monthly counts for mentors and mentees
    const mentorCounts = await userModel.aggregate([
      {
        $match: {
          role: "mentor",
          createdAt: {
            $gte: new Date(`${selectedYear}-01-01`),
            $lt: new Date(`${selectedYear + 1}-01-01`),
          },
        },
      },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const menteeCounts = await userModel.aggregate([
      {
        $match: {
          role: "mentee",
          createdAt: {
            $gte: new Date(`${selectedYear}-01-01`),
            $lt: new Date(`${selectedYear + 1}-01-01`),
          },
        },
      },
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      year: selectedYear,
      mentorCounts,
      menteeCounts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMentees,
  getAMentee,
  verifyMentorId,
  declineMentorId,
  getAllEmailRequest,
  changeUserEmail,
  getMentorMenteeStats,
  getMonthlyAnalytics,
};
