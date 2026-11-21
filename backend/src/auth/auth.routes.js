const express = require("express");
const authController = require("./auth.controller");
const { requireJWTAuth } = require("./auth.config");

const router = express.Router();

// POST /login - Autenticação de usuário
router.post("/login", authController.login);

// POST /logout - Logout de usuário
router.post("/logout", authController.logout);

// GET /me - Retorna os dados básicos da sessão autenticada
router.get("/me", requireJWTAuth, authController.obterSessao);

// POST /novoUsuario - Criar novo usuário
router.post("/novoUsuario", authController.criarUsuario);

module.exports = router;
