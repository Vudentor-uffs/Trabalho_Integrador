const clientes_pjService = require("./clientes_pj.service");

async function listar(req, res) {
    try {
        const clientes_pj = await clientes_pjService.listar();
        return res.status(200).json(clientes_pj);
    } catch (erro) {
        console.log("Erro ao buscar clientes:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const cliente_pj = await clientes_pjService.buscarPorId(req.params.id);
        return res.status(200).json(cliente_pj);
    } catch (erro) {
        console.log("Erro ao buscar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const cliente_pj = await clientes_pjService.criar(req.body);
        return res.status(201).json(cliente_pj);
    } catch (erro) {
        console.log("Erro ao criar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const cliente_pj = await clientes_pjService.atualizar(req.params.id, req.body);
        if (!cliente_pj) return res.status(404).json({ erro: "Cliente não encontrado" });
        return res.status(200).json(cliente_pj);
    } catch (erro) {
        console.log("Erro ao atualizar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const cliente_pj = await clientes_pjService.deletar(req.params.id);
        if (!cliente_pj) return res.status(404).json({ erro: "Cliente não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
