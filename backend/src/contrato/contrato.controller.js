const contratoService = require("./contrato.service");

async function listar(req, res) {
    try {
        const contratos = await contratoService.listar();
        return res.status(200).json(contratos);
    } catch (erro) {
        console.log("Erro ao buscar contratos:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const contrato = await contratoService.buscarPorId(req.params.id);
        return res.status(200).json(contrato);
    } catch (erro) {
        console.log("Erro ao buscar contrato:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const contrato = await contratoService.criar(req.body);
        return res.status(201).json(contrato);
    } catch (erro) {
        console.log("Erro ao criar contrato:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const contrato = await contratoService.atualizar(req.params.id, req.body);
        if (!contrato) return res.status(404).json({ erro: "Contrato não encontrado" });
        return res.status(200).json(contrato);
    } catch (erro) {
        console.log("Erro ao atualizar contrato:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const contrato = await contratoService.deletar(req.params.id);
        if (!contrato) return res.status(404).json({ erro: "Contrato não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar contrato:", erro);
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
