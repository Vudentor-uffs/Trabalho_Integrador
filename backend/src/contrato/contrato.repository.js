const { Contrato } = require("../database/models");

async function listar() {
    return Contrato.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return Contrato.findByPk(id);
}

async function criar(dados) {
    return Contrato.create(dados);
}

async function atualizar(id, dados) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) return null;
    return contrato.update(dados);
}

async function deletar(id) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) return null;
    await contrato.destroy();
    return contrato;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
