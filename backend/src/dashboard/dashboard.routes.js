const express = require("express");
const dashboardController = require("./dashboard.controller");
const { requireJWTAuth } = require("../auth/auth.config");

const router = express.Router();

// GET /dasboard
router.get("/dashboard", requireJWTAuth, dashboardController.verDashboard);

module.exports = router;