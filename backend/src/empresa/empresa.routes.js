const express = require("express");
const empresaController = require("./empresa.controller");

const router = express.Router();

// GET /empresa
router.get("/empresa", empresaController.listar);

// GET /empresa/:id
router.get("/empresa/:id", empresaController.buscarPorId);

// POST /empresa
router.post("/empresa", empresaController.criar);

// PUT /empresa/:id
router.put("/empresa/:id", empresaController.atualizar);

// DELETE /empresa/:id
router.delete("/empresa/:id", empresaController.deletar);

module.exports = router;
