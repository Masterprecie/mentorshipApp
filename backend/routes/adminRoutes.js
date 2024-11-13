const express = require("express");
const authenticatedUser = require("../middlewares/authenticatedUser");
const rolesAllowed = require("../middlewares/rolesAllowed");
const {
  getAllMentees,
  getAMentee,
  declineMentorId,
  verifyMentorId,
  getAllEmailRequest,
  changeUserEmail,
  getMentorMenteeStats,
  getMonthlyAnalytics,
} = require("../controllers/adminController");
const adminRoutes = express.Router();
//middlewares
adminRoutes.use(authenticatedUser);
adminRoutes.use(rolesAllowed(["admin"]));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Mentees management
 */

/**
 * @swagger
 * /api/v1/admin/mentees:
 *   get:
 *     summary: Get all mentors with pagination
 *     tags: [Admin]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of mentors per page
 *     responses:
 *       200:
 *         description: A list of mentees
 *       404:
 *         description: No mentors found
 *       500:
 *         description: Internal server error
 */
adminRoutes.get("/mentees", getAllMentees);

/**
 * @swagger
 * /api/v1/admin/mentee/{menteeId}:
 *   get:
 *     summary: Get a mentee by ID
 *     tags: [Admin]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menteeId
 *         schema:
 *           type: string
 *         description: Mentee ID
 *     responses:
 *       200:
 *         description: Mentee detail retrieved successfully
 *       404:
 *         description: No mentee found
 *       500:
 *         description: Internal server error
 */
adminRoutes.get("/mentees/:menteeId", getAMentee);

/**
 * @swagger
 * /api/v1/admin/mentor/verifyId:
 *   put:
 *     summary: Verify mentor ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                 type: string
 *                 description: Mentor ID
 *             required:
 *               - mentorId
 *     responses:
 *       200:
 *         description: MentorId verified successfully
 *       404:
 *         description: No mentor found
 *       500:
 *         description: Internal server error
 */

adminRoutes.put("/mentor/verifyId", verifyMentorId);

/**
 * @swagger
 * /api/v1/admin/mentor/declineId:
 *   put:
 *     summary: Decline mentor ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                 type: string
 *                 description: Mentor ID
 *             required:
 *               - mentorId
 *     responses:
 *       200:
 *         description: MentorId Declined successfully
 *       404:
 *         description: No mentor found
 *       500:
 *         description: Internal server error
 */
adminRoutes.put("/mentor/declineId", declineMentorId);

/**
 * @swagger
 * /api/v1/admin/email-change-request:
 *   get:
 *     summary: Get all email change request with pagination
 *     tags: [Admin]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of email change request per page
 *     responses:
 *       200:
 *         description: Email change request retrieved successfully
 *       404:
 *         description: No Email change request found
 *       500:
 *         description: Internal server error
 */
adminRoutes.get("/email-change-request", getAllEmailRequest);

/**
 * @swagger
 * /api/v1/admin/{userId}/change-email:
 *   put:
 *     summary: Change user email
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEmail:
 *                 type: string
 *                 description: New email address
 *             required:
 *               - newEmail
 *     responses:
 *       200:
 *         description: Email changed successfully
 *       400:
 *         description: Email is already in use
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
adminRoutes.put("/:userId/change-email", changeUserEmail);

/**
 * @swagger
 * /api/v1/admin/stats:
 *   get:
 *     summary: Get mentor and mentee stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats retrieved successfully
 *       500:
 *         description: Internal server error
 */
adminRoutes.get("/stats", getMentorMenteeStats);

/**
 * @swagger
 * /api/v1/admin/analytics:
 *   get:
 *     summary: Get monthly analytics for mentors and mentees
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year for which to get the analytics
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *       500:
 *         description: Internal server error
 */
adminRoutes.get("/analytics", getMonthlyAnalytics);

module.exports = adminRoutes;
