const express = require("express");
const dashboardController = require("./dashboard.controller");
const { requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// GET /dasboard
router.get("/dashboard", requirePermissao("ADMIN"), dashboardController.verDashboard);

module.exports = router;