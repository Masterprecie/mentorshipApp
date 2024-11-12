const express = require("express");
const {
  getAllMentors,
  getAMentor,
  contact,
  getAllContacts,
} = require("../controllers/sharedController");
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
 *     tags: [Mentors]
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

module.exports = sharedRoutes;
