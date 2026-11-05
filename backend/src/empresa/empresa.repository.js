const { Empresa } = require("../database/models");

async function listar() {
    return Empresa.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return Empresa.findByPk(id);
}

async function atualizar(id, dados) {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) return null;
    return empresa.update(dados);
}

module.exports = {
    listar,
    buscarPorId,
    atualizar,
};
