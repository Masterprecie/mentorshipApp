const express = require("express");
const authenticatedUser = require("../middlewares/authenticatedUser");
const rolesAllowed = require("../middlewares/rolesAllowed");
const {
  changePassword,
  changeEmailRequest,
} = require("../controllers/settingsController");
const settingsRoutes = express.Router();
//middlewares
settingsRoutes.use(authenticatedUser);

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Settings management
 */

/**
 * @swagger
 * /api/v1/settings/change-password:
 *   post:
 *     summary: Change User Password
 *     tags: [Settings]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

settingsRoutes.post("/change-password", changePassword);

/**
 * @swagger
 * /api/v1/settings/change-email-request:
 *   post:
 *     summary: Change Email Request
 *     tags: [Settings]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - reason
 *             properties:
 *               email:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email Change Requested successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
settingsRoutes.post("/change-email-request", changeEmailRequest);

module.exports = settingsRoutes;
