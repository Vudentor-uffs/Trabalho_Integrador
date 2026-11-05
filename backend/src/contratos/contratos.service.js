const contratosRepository = require("./contratos.repository");

async function listar() {
    return contratosRepository.listar();
}

async function buscarPorId(id) {
    return contratosRepository.buscarPorId(id);
}

async function criar(dados) {
    return contratosRepository.criar(dados);
}

async function atualizar(id, dados) {
    return contratosRepository.atualizar(id, dados);
}

async function deletar(id) {
    return contratosRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
