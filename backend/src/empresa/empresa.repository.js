const { EmpresaAdm } = require("../database/models");

async function listar() {
    return EmpresaAdm.findAll({ order: [["nome", "ASC"]] });
}

async function buscarPorId(id) {
    return EmpresaAdm.findByPk(id);
}

async function atualizar(id, dados) {
    const empresaAdm = await EmpresaAdm.findByPk(id);
    if (!empresaAdm) return null;
    return empresaAdm.update(dados);
}

module.exports = {
    listar,
    buscarPorId,
    atualizar,
};
