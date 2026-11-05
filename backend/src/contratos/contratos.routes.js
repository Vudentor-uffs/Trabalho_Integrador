const express = require("express");
const contratosController = require("./contratos.controller");

const router = express.Router();

// GET /contratos
router.get("/contratos", contratosController.listar);

// GET /contratos/:id
router.get("/contratos/:id", contratosController.buscarPorId);

// POST /contratos
router.post("/contratos", contratosController.criar);

// PUT /contratos/:id
router.put("/contratos/:id", contratosController.atualizar);

// DELETE /contratos/:id
router.delete("/contratos/:id", contratosController.deletar);

module.exports = router;
