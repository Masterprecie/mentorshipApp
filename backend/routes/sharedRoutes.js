const express = require("express");
const {
  getAllMentors,
  getAMentor,
  contact,
  getAllContacts,
  getUserNotifications,
  deleteUserNotification,
} = require("../controllers/sharedController");
const authenticatedUser = require("../middlewares/authenticatedUser");

const sharedRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mentors
 *   description: Mentors management
 */

/**
 * @swagger
 * /api/v1/user/mentors:
 *   get:
 *     summary: Get all mentors with pagination
 *     tags: [Mentors]
 *     security: []
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
 *         description: A list of mentors
 *       404:
 *         description: No mentors found
 *       500:
 *         description: Internal server error
 */

sharedRoutes.get("/mentors", getAllMentors);

/**
 * @swagger
 * /api/v1/user/mentor/{mentorId}:
 *   get:
 *     summary: Get a mentor by ID
 *     tags: [Mentors]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: mentorId
 *         schema:
 *           type: string
 *         description: Mentor ID
 *     responses:
 *       200:
 *         description: A list of mentors
 *       404:
 *         description: No mentors found
 *       500:
 *         description: Internal server error
 */
sharedRoutes.get("/mentor/:mentorId", getAMentor);

/**
 * @swagger
 * /api/v1/user/contact:
 *   post:
 *     summary: Contact Us
 *     tags: [Contact]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phoneNumber
 *               - message
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message Sent successful
 *       500:
 *         description: Internal server error
 */
sharedRoutes.post("/contact", contact);

/**
 * @swagger
 * /api/v1/user/contact:
 *   get:
 *     summary: Get all contacts with pagination
 *     tags: [Contact]
 *     security: []
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
 *         description: Number of contacts per page
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully
 *       404:
 *         description: No contact found
 *       500:
 *         description: Internal server error
 */
sharedRoutes.get("/contact", getAllContacts);

/**
 * @swagger
 * /api/v1/user/notifications/{userId}:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *       404:
 *         description: No notifications found
 *       500:
 *         description: Internal server error
 */
sharedRoutes.get(
  "/notifications/:userId",
  authenticatedUser,
  getUserNotifications
);

/**
 * @swagger
 * /api/v1/user/notifications/{notificationId}:
 *   delete:
 *     summary: Delete user notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
sharedRoutes.delete(
  "/notifications/:notificationId",
  authenticatedUser,
  deleteUserNotification
);

module.exports = sharedRoutes;
