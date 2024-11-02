const express = require("express");
const authenticatedUser = require("../middlewares/authenticatedUser");
const rolesAllowed = require("../middlewares/rolesAllowed");
const { getAllMentees, getAMentee } = require("../controllers/adminController");
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

module.exports = adminRoutes;
