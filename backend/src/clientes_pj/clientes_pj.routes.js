const express = require("express");
const clientes_pjController = require("./clientes_pj.controller");
const { requireJWTAuth, requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// GET /clientes_pj
router.get("/clientes_pj", clientes_pjController.listar);

// GET /clientes_pj/:id
router.get("/clientes_pj/:id", clientes_pjController.buscarPorId);

// POST /clientes_pj
router.post("/clientes_pj", requireJWTAuth, requirePermissao("CRIAR_CLIENTE_PJ"),clientes_pjController.criar);

// PUT /clientes_pj/:id
router.put("/clientes_pj/:id", requireJWTAuth, requirePermissao("EDITAR_CLIENTE_PJ"),clientes_pjController.atualizar);

// DELETE /clientes_pj/:id
router.delete("/clientes_pj/:id", requireJWTAuth, requirePermissao("DELETAR_CLIENTE_PJ"),clientes_pjController.deletar);

module.exports = router;
