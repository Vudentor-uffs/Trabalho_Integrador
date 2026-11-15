const empresaService = require("./empresa.service");

async function buscar(req, res) {
    try {
        const empresa = await empresaService.buscar();
        if (!empresa) {
            return res.status(404).json({ erro: "Empresa não encontrada." });
        }
        return res.status(200).json(empresa);
    } catch (erro) {
        console.log("Erro ao buscar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const empresa = await empresaService.atualizar(req.body);
        if (!empresa) return res.status(404).json({ erro: "Empresa não encontrada" });
        return res.status(200).json(empresa);
    } catch (erro) {
        console.log("Erro ao atualizar empresa:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    buscar,
    atualizar,
};
