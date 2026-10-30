const { Empresa } = require("../database/models");

async function listar() {
    return Empresa.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return Empresa.findByPk(id);
}

async function criar(dados) {
    return Empresa.create(dados);
}

async function atualizar(id, dados) {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) return null;
    return empresa.update(dados);
}

async function deletar(id) {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) return null;
    await empresa.destroy();
    return empresa;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
