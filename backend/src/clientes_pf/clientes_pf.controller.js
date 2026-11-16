const clientes_pfService = require("./clientes_pf.service");

async function listar(req, res) {
    try {
        const clientes_pf = await clientes_pfService.listar(req.query);
        return res.status(200).json(clientes_pf);
    } catch (erro) {
        console.log("Erro ao buscar clientes:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const cliente_pf = await clientes_pfService.buscarPorId(req.params.id);
        if (!cliente_pf) return res.status(404).json({ erro: "Cliente não encontrado." });
        return res.status(200).json(cliente_pf);
    } catch (erro) {
        console.log("Erro ao buscar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const cliente_pf = await clientes_pfService.criar(req.body);
        return res.status(201).json(cliente_pf);
    } catch (erro) {
        console.log("Erro ao criar cliente:", erro);
        if (erro.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ erro: "CPF já cadastrado." });
        }
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const cliente_pf = await clientes_pfService.atualizar(req.params.id, req.body);
        if (!cliente_pf) return res.status(404).json({ erro: "Cliente não encontrado." });
        return res.status(200).json(cliente_pf);
    } catch (erro) {
        console.log("Erro ao atualizar cliente:", erro);
        if (erro.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ erro: "Já existe um cliente cadastrado com este CPF." });
        }
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const cliente_pf = await clientes_pfService.deletar(req.params.id);
        if (!cliente_pf) return res.status(404).json({ erro: "Cliente não encontrado" });
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
