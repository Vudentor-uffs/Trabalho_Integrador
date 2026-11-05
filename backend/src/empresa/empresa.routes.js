const express = require("express");
const empresaAdmController = require("./empresa.controller");

const router = express.Router();

// GET /empresa_adm
router.get("/empresa_adm", empresaAdmController.listar);

// GET /empresa_adm/:id
router.get("/empresa_adm/:id", empresaAdmController.buscarPorId);

// PUT /empresa_adm/:id
router.put("/empresa_adm/:id", empresaAdmController.atualizar);

module.exports = router;
