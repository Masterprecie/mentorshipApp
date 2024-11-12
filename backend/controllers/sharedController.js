const contactModel = require("../models/contactModel");
const userModel = require("../models/userModel");

const getAllMentors = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;

    const options = {
      page,
      limit,
      select:
        "-password -otp -otpExpires -otpPurpose -refreshToken -isEmailVerified",
    };

    const query = { role: "mentor" };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { age: { $regex: search, $options: "i" } },
        { expertise: { $regex: search, $options: "i" } },
        { yearsOfExperience: { $regex: search, $options: "i" } },
      ];
    }

    const mentors = await userModel.paginate(query, options);

    if (mentors.docs.length === 0) {
      return res.status(404).send({
        message: "No mentors found",
      });
    }

    res.status(200).json(mentors);
  } catch (error) {
    next(error);
  }
};

const getAMentor = async (req, res, next) => {
  try {
    const { mentorId } = req.params;

    const mentor = await userModel
      .findOne({ _id: mentorId })
      .select("-password -refreshToken -otpPurpose -__v");

    if (!mentor) {
      return res.status(404).send({
        message: "Mentor not found",
      });
    }

    res.status(200).json(mentor);
  } catch (error) {
    next(error);
  }
};

const contact = async (req, res, next) => {
  try {
    const { fullName, email, phoneNumber, message } = req.body;

    const contact = await contactModel.create({
      fullName,
      email,
      phoneNumber,
      message,
    });

    res.status(200).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const options = {
      page,
      limit,
    };

    const contacts = await contactModel.paginate({}, options);

    if (contacts.docs.length === 0) {
      return res.status(404).send({
        message: "No contact found",
      });
    }

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMentors,
  getAMentor,
  contact,
  getAllContacts,
};
