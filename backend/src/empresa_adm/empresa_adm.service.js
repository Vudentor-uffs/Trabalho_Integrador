const empresaAdmRepository = require("./empresa_adm.repository");

async function listar() {
    return empresaAdmRepository.listar();
}

async function buscarPorId(id) {
    return empresaAdmRepository.buscarPorId(id);
}

async function atualizar(id, dados) {
    return empresaAdmRepository.atualizar(id, dados);
}

module.exports = {
    listar,
    buscarPorId,
    atualizar,
};
