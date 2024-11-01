const express = require("express");
const {
  getProfile,
  updateProfile,
  addEducation,
  updateEducationEntry,
  deleteEducationEntry,
  addWorkExperience,
  updateWorkExperienceEntry,
  deleteWorkExperienceEntry,
} = require("../controllers/profileController");
const authenticatedUser = require("../middlewares/authenticatedUser");
const profileRoutes = express.Router();
//middlewares
profileRoutes.use(authenticatedUser);

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management
 */

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid or expired token
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */

profileRoutes.get("/", getProfile);

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Update profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - interest
 *               - age
 *               - gender
 *               - yearsOfExperience
 *               - profilePictureURL
 *               - about
 *               - expertise
 *               - country
 *               - languages
 *               - linkedinUrl
 *               - twitterUrl
 *               - facebookUrl
 *               - education
 *               - workExperience
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               interest:
 *                 type: array
 *                 items:
 *                   type: string
 *               age:
 *                 type: string
 *               gender:
 *                 type: string
 *               yearsOfExperience:
 *                 type: string
 *               profilePictureURL:
 *                 type: string
 *               about:
 *                 type: string
 *               linkedinUrl:
 *                 type: string
 *               expertise:
 *                 type: array
 *                 items:
 *                   type: string
 *               country:
 *                 type: string
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     schoolName:
 *                       type: string
 *                     degree:
 *                       type: string
 *                     startYear:
 *                       type: string
 *                     endYear:
 *                       type: string
 *               workExperience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     company:
 *                       type: string
 *                     role:
 *                       type: string
 *                     industry:
 *                       type: array
 *                       items:
 *                         type: string
 *                     startDate:
 *                       type: string
 *                     endDate:
 *                       type: string
 *                     briefContribution:
 *                       type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

profileRoutes.put("/", updateProfile);

// Routes for Education
/**
 * @swagger
 * /api/v1/profile/education:
 *   post:
 *     summary: Add new education
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               education:
 *                 type: object
 *                 properties:
 *                   schoolName:
 *                     type: string
 *                   degree:
 *                     type: string
 *                   startYear:
 *                     type: string
 *                   endYear:
 *                     type: string
 *     responses:
 *       201:
 *         description: Education entry added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     education:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           schoolName:
 *                             type: string
 *                           degree:
 *                             type: string
 *                           startYear:
 *                             type: string
 *                           endYear:
 *                             type: string
 *                           _id:
 *                             type: string
 *       500:
 *         description: Internal server error
 */

profileRoutes.post("/education", addEducation);

/**
 * @swagger
 * /api/v1/profile/education/{entryId}:
 *   put:
 *     summary: Update education
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the education to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               education:
 *                 type: object
 *                 properties:
 *                   schoolName:
 *                     type: string
 *                   degree:
 *                     type: string
 *                   startYear:
 *                     type: string
 *                   endYear:
 *                     type: string
 *     responses:
 *       200:
 *         description: Education entry updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     education:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           schoolName:
 *                             type: string
 *                           degree:
 *                             type: string
 *                           startYear:
 *                             type: string
 *                           endYear:
 *                             type: string
 *                           _id:
 *                             type: string
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

profileRoutes.put("/education/:entryId", updateEducationEntry);

/**
 * @swagger
 * /api/v1/profile/education/{entryId}:
 *   delete:
 *     summary: Delete Education
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entryId
 *         schema:
 *           type: string
 *         description: Education ID
 *     responses:
 *       201:
 *         description: Education Deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
profileRoutes.delete("/education/:entryId", deleteEducationEntry);

// Routes for Work Experience

/**
 * @swagger
 * /api/v1/profile/experience:
 *   post:
 *     summary: Add a new work experience
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workExperience:
 *                 type: object
 *                 properties:
 *                   company:
 *                     type: string
 *                   role:
 *                     type: string
 *                   industry:
 *                     type: array
 *                     items:
 *                       type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *                   briefContribution:
 *                     type: string
 *     responses:
 *       200:
 *         description: Work experience updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     workExperience:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           company:
 *                             type: string
 *                           role:
 *                             type: string
 *                           industry:
 *                             type: array
 *                             items:
 *                               type: string
 *                           startDate:
 *                             type: string
 *                             format: date
 *                           endDate:
 *                             type: string
 *                             format: date
 *                           briefContribution:
 *                             type: string
 *                           _id:
 *                             type: string
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

profileRoutes.post("/experience", addWorkExperience);

/**
 * @swagger
 * /api/v1/profile/experience/{entryId}:
 *   put:
 *     summary: Update work experience
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the work experience to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workExperience:
 *                 type: object
 *                 properties:
 *                   company:
 *                     type: string
 *                   role:
 *                     type: string
 *                   industry:
 *                     type: array
 *                     items:
 *                       type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *                   briefContribution:
 *                     type: string
 *     responses:
 *       200:
 *         description: Work experience updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     workExperience:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           company:
 *                             type: string
 *                           role:
 *                             type: string
 *                           industry:
 *                             type: array
 *                             items:
 *                               type: string
 *                           startDate:
 *                             type: string
 *                             format: date
 *                           endDate:
 *                             type: string
 *                             format: date
 *                           briefContribution:
 *                             type: string
 *                           _id:
 *                             type: string
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */

profileRoutes.put("/experience/:entryId", updateWorkExperienceEntry);

/**
 * @swagger
 * /api/v1/profile/experience/{entryId}:
 *   delete:
 *     summary: Delete Work Experience
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entryId
 *         schema:
 *           type: string
 *         description: Experience ID
 *     responses:
 *       201:
 *         description: Work Experience Deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
profileRoutes.delete("/experience/:entryId", deleteWorkExperienceEntry);

module.exports = profileRoutes;
