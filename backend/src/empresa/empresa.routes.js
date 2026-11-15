const express = require("express");
const empresaController = require("./empresa.controller");

const router = express.Router();

// GET /empresa
router.get("/empresa", empresaController.buscar);

// PUT /empresa
router.put("/empresa", empresaController.atualizar);

module.exports = router;
