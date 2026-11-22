const express = require("express");
const contratosController = require("./contratos.controller");
const { requireJWTAuth, requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// GET /contratos
router.get("/contratos", requirePermissao("ADMIN"), contratosController.listar);

// GET /contratos/:id
router.get("/contratos/:id", requirePermissao("ADMIN"), contratosController.buscarPorId);

// POST /contratos
router.post("/contratos", requireJWTAuth, requirePermissao("CRIAR_CONTRATO"), contratosController.criar);

// PUT /contratos/:id
router.put("/contratos/:id", requireJWTAuth, requirePermissao("EDITAR_CONTRATO"), contratosController.atualizar);

// DELETE /contratos/:id
router.delete("/contratos/:id", requireJWTAuth, requirePermissao("DELETAR_CONTRATO"), contratosController.deletar);

module.exports = router;
