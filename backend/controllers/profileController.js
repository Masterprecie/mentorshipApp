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

    const { password, email, mentorIdcard, ...updateData } = req.body;

    // Check if mentorIdcard is being updated
    if (mentorIdcard) {
      updateData.mentorIdcard = mentorIdcard;
      updateData.idCardStatus = "pending";
      updateData.declinedIdReason = null;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      decoded.id,
      {
        $set: updateData,
      },
      { new: true, runValidators: true }
    );

    const { password: pwd, __v, ...userProfile } = updatedUser.toObject();

    res.status(200).send({
      user: userProfile,
    });
  } catch (error) {
    next(error);
  }
};

// Add a new education entry
const addEducation = async (req, res, next) => {
  const { education } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_KEY);

  try {
    const user = await userModel.findById(decoded.id);
    user.education.push(education); // Add new education entry to the array
    await user.save();
    res.status(201).json({ message: "Education entry added", user });
  } catch (error) {
    next(error);
  }
};

// Update an education entry by ID
const updateEducationEntry = async (req, res, next) => {
  const { entryId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_KEY);

  try {
    const user = await userModel.findById(decoded.id);
    const educationEntry = user.education.id(entryId); // Find specific entry by ID
    if (!educationEntry)
      return res.status(404).json({ message: "Id not found" });

    Object.assign(educationEntry, req.body.education); // Update entry with new data
    await user.save();
    res.status(200).json({ message: "Education entry updated", user });
  } catch (error) {
    next(error);
  }
};

// Delete an education entry by ID
const deleteEducationEntry = async (req, res, next) => {
  const { entryId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_KEY);

  try {
    const user = await userModel.findById(decoded.id);
    user.education.pull({ _id: entryId }); // Remove entry by ID using pull
    await user.save();
    res.status(200).json({ message: "Education entry deleted", user });
  } catch (error) {
    next(error);
  }
};

// Similar functions for work experience
const addWorkExperience = async (req, res, next) => {
  const { workExperience } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_KEY);

  try {
    const user = await userModel.findById(decoded.id);
    user.workExperience.push(workExperience); // Add new work experience entry
    await user.save();
    res.status(201).json({ message: "Work experience added", user });
  } catch (error) {
    next(error);
  }
};

const updateWorkExperienceEntry = async (req, res, next) => {
  const { entryId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_KEY);

  try {
    const user = await userModel.findById(decoded.id);
    const workExperienceEntry = user.workExperience.id(entryId); // Find entry by ID
    if (!workExperienceEntry)
      return res.status(404).json({ message: "Id not found" });

    Object.assign(workExperienceEntry, req.body.workExperience); // Update entry with new data
    await user.save();
    res.status(200).json({ message: "Work experience updated", user });
  } catch (error) {
    next(error);
  }
};

const deleteWorkExperienceEntry = async (req, res, next) => {
  const { entryId } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_KEY);

  try {
    const user = await userModel.findById(decoded.id);
    user.workExperience.pull({ _id: entryId });
    await user.save();
    res.status(200).json({ message: "Work experience deleted", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  getProfile,
  addEducation,
  updateEducationEntry,
  deleteEducationEntry,
  addWorkExperience,
  updateWorkExperienceEntry,
  deleteWorkExperienceEntry,
};
