const empresaRepository = require("./empresa.repository");

async function listar() {
    return empresaRepository.listar();
}

async function buscarPorId(id) {
    return empresaRepository.buscarPorId(id);
}

async function atualizar(id, dados) {
    return empresaRepository.atualizar(id, dados);
}

module.exports = {
    listar,
    buscarPorId,
    atualizar,
};
