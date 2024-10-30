const express = require("express");
const {
  register,
  login,
  verifyEmail,
  resendOTP,
  refreshToken,
} = require("../controllers/authController");
const authRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *               - interest
 *               - age
 *               - gender
 *               - yearsOfExperience
 *               - profilePictureURL
 *               - about
 *               - linkedinUrl
 *               - expertise
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, mentor, mentee]
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
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

authRoutes.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       500:
 *         description: Internal server error
 */

authRoutes.post("/login", login);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   post:
 *     summary: Verify email address
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: EMail Verified successful
 *       500:
 *         description: Internal server error
 */

authRoutes.post("/verify-email/", verifyEmail);

/**
 * @swagger
 * /api/v1/auth/resend-otp:
 *   post:
 *     summary: Resend otp
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP Resent successful
 *       500:
 *         description: Internal server error
 */
authRoutes.post("/resend-otp/", resendOTP);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh Token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Refresh token sent successful
 *       500:
 *         description: Internal server error
 */
authRoutes.post("/refresh", refreshToken);

module.exports = authRoutes;
