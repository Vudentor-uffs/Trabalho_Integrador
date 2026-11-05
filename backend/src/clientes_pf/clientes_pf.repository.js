const { Cliente } = require("../database/models");

async function listar() {
    return Cliente.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return Cliente.findByPk(id);
}

async function criar(dados) {
    return Cliente.create(dados);
}

async function atualizar(id, dados) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    return cliente.update(dados);
}

async function deletar(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    await cliente.destroy();
    return cliente;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
