const express = require("express");
const clienteController = require("./cliente.controller");

const router = express.Router();

// GET /cliente
router.get("/cliente", clienteController.listar);

// GET /cliente/:id
router.get("/cliente/:id", clienteController.buscarPorId);

// POST /cliente
router.post("/cliente", clienteController.criar);

// PUT /cliente/:id
router.put("/cliente/:id", clienteController.atualizar);

// DELETE /cliente/:id
router.delete("/cliente/:id", clienteController.deletar);

module.exports = router;
