
const express = require('express');

const database = require("../database");

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json(database.pessoas);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = database.pessoas.find(f => f.id === id);
    if (!pessoa) {
        return res.status(404).json({ erro: "Pessoa não encontrado" });
    }
    res.status(200).json(pessoa);
});


router.post('/', (req, res) => {
    const { nome, email, telefone, avaliação } = req.body;
    if (!nome || !email || !telefone || !avaliação) {
        return res.status(400).json({ erro: "Todos os campos do Pessoa são obrigatórios" });
    }

    const proximoId = database.pessoas.length > 0 
        ? Math.max(...database.pessoas.map(f => f.id)) + 1 
        : 1;

    const novaPessoa = { id: proximoId, nome, email, telefone, avaliação };
    database.pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, telefone, avaliação } = req.body;

    const indice = database.pessoas.findIndex(f => f.id === id);
    if (indice === -1) {
        return res.status(404).json({ erro: "Pessoa não encontrado" });
    }

    database.pessoas[indice] = { id, nome, email, telefone, avaliação };
    res.status(200).json(database.pessoas[indice]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = database.pessoas.findIndex(f => f.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Pessoa não encontrado" });
    }

    database.pessoas.splice(indice, 1);
    res.status(204).send();
});

module.exports = router;