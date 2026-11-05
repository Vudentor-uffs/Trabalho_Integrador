const { ClientePf } = require("../database/models");

async function listar() {
    return ClientePf.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return ClientePf.findByPk(id);
}

async function criar(dados) {
    return ClientePf.create(dados);
}

async function atualizar(id, dados) {
    const cliente_pf = await ClientePf.findByPk(id);
    if (!cliente_pf) return null;
    return cliente_pf.update(dados);
}

async function deletar(id) {
    const cliente_pf = await ClientePf.findByPk(id);
    if (!cliente_pf) return null;
    await cliente_pf.destroy();
    return cliente_pf;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
