const clienteService = require("./cliente.service");

async function listar(req, res) {
    try {
        const clientes = await clienteService.listar();
        return res.status(200).json(clientes);
    } catch (erro) {
        console.log("Erro ao buscar clientes:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const cliente = await clienteService.buscarPorId(req.params.id);
        return res.status(200).json(cliente);
    } catch (erro) {
        console.log("Erro ao buscar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const cliente = await clienteService.criar(req.body);
        return res.status(201).json(cliente);
    } catch (erro) {
        console.log("Erro ao criar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const cliente = await clienteService.atualizar(req.params.id, req.body);
        if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
        return res.status(200).json(cliente);
    } catch (erro) {
        console.log("Erro ao atualizar cliente:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const cliente = await clienteService.deletar(req.params.id);
        if (!cliente) return res.status(404).json({ erro: "Cliente não encontrado" });
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
