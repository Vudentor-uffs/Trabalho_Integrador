const express = require("express");
const clientes_pfController = require("./clientes_pf.controller");

const router = express.Router();

// GET /clientes_pf
router.get("/clientes_pf", clientes_pfController.listar);

// GET /clientes_pf/:id
router.get("/clientes_pf/:id", clientes_pfController.buscarPorId);

// POST /clientes_pf
router.post("/clientes_pf", clientes_pfController.criar);

// PUT /clientes_pf/:id
router.put("/clientes_pf/:id", clientes_pfController.atualizar);

// DELETE /clientes_pf/:id
router.delete("/clientes_pf/:id", clientes_pfController.deletar);

module.exports = router;
