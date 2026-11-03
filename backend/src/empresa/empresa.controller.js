const empresaService = require("./empresa.service");

async function listar(req, res) {
    try {
        const empresas = await empresaService.listar();
        return res.status(200).json(empresas);
    } catch (erro) {
        console.log("Erro ao buscar empresas:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const empresa = await empresaService.buscarPorId(req.params.id);
        return res.status(200).json(empresa);
    } catch (erro) {
        console.log("Erro ao buscar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criar(req, res) {
    try {
        const empresa = await empresaService.criar(req.body);
        return res.status(201).json(empresa);
    } catch (erro) {
        console.log("Erro ao criar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const empresa = await empresaService.atualizar(req.params.id, req.body);
        if (!empresa) return res.status(404).json({ erro: "Empresa não encontrada" });
        return res.status(200).json(empresa);
    } catch (erro) {
        console.log("Erro ao atualizar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function deletar(req, res) {
    try {
        const empresa = await empresaService.deletar(req.params.id);
        if (!empresa) return res.status(404).json({ erro: "Empresa não encontrado" });
        return res.status(204).send();
    } catch (erro) {
        console.log("Erro ao deletar empresa:", erro);
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
