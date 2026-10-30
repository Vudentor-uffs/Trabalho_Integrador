const express = require("express");
const contratoController = require("./contrato.controller");

const router = express.Router();

// GET /contrato
router.get("/contrato", contratoController.listar);

// GET /contrato/:id
router.get("/contrato/:id", contratoController.buscarPorId);

// POST /contrato
router.post("/contrato", contratoController.criar);

// PUT /contrato/:id
router.put("/contrato/:id", contratoController.atualizar);

// DELETE /contrato/:id
router.delete("/contrato/:id", contratoController.deletar);

module.exports = router;
