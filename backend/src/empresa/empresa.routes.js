const express = require("express");
const empresaController = require("./empresa.controller");

const router = express.Router();

// GET /empresa
router.get("/empresa", empresaController.listar);

// GET /empresa/:id
router.get("/empresa/:id", empresaController.buscarPorId);

// PUT /empresa/:id
router.put("/empresa/:id", empresaController.atualizar);

module.exports = router;
