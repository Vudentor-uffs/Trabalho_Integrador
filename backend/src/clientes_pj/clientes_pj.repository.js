const { ClientePj } = require("../database/models");

async function listar() {
    return ClientePj.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return ClientePj.findByPk(id);
}

async function criar(dados) {
    return ClientePj.create(dados);
}

async function atualizar(id, dados) {
    const cliente_pj = await ClientePj.findByPk(id);
    if (!cliente_pj) return null;
    return cliente_pj.update(dados);
}

async function deletar(id) {
    const cliente_pj = await ClientePj.findByPk(id);
    if (!cliente_pj) return null;
    await cliente_pj.destroy();
    return cliente_pj;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
