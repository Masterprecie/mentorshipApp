const express = require("express");
const authenticatedUser = require("../middlewares/authenticatedUser");
const rolesAllowed = require("../middlewares/rolesAllowed");
const adminRoutes = express.Router();
//middlewares
adminRoutes.use(authenticatedUser);
adminRoutes.use(rolesAllowed(["admin"]));
module.exports = adminRoutes;
