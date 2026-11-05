const empresaAdmService = require("./empresa.service");

async function listar(req, res) {
    try {
        const empresaAdm = await empresaAdmService.listar();
        return res.status(200).json(empresaAdm);
    } catch (erro) {
        console.log("Erro ao buscar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function buscarPorId(req, res) {
    try {
        const empresaAdm = await empresaAdmService.buscarPorId(req.params.id);
        return res.status(200).json(empresaAdm);
    } catch (erro) {
        console.log("Erro ao buscar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const empresaAdm = await empresaAdmService.atualizar(req.params.id, req.body);
        if (!empresaAdm) return res.status(404).json({ erro: "Empresa não encontrada" });
        return res.status(200).json(empresaAdm);
    } catch (erro) {
        console.log("Erro ao atualizar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar,
    buscarPorId,
    atualizar,
};
