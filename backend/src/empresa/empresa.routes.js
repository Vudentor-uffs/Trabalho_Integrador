const express = require("express");
const empresaController = require("./empresa.controller");
const { requireJWTAuth, requirePermissao } = require("../auth/auth.config");

const router = express.Router();

// GET /empresa
router.get("/empresa", empresaController.buscar);

// PUT /empresa
router.put("/empresa", requireJWTAuth, requirePermissao("EDITAR_EMPRESA_ADM"), empresaController.atualizar);

module.exports = router;
