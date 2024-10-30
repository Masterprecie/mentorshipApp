const express = require("express");
const {
  getAllMentors,
  getAMentor,
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
// sharedRoutes.get("/book", bookMentor);

module.exports = sharedRoutes;
