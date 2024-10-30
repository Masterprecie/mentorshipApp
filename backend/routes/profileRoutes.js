const express = require("express");
const {
  getProfile,
  updateProfile,
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
 *               - language
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
 *               language:
 *                 type: string
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

module.exports = profileRoutes;
