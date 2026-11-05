const contratoRepository = require("./contrato.repository");

async function listar() {
    return contratoRepository.listar();
}

async function buscarPorId(id) {
    return contratoRepository.buscarPorId(id);
}

async function criar(dados) {
    return contratoRepository.criar(dados);
}

async function atualizar(id, dados) {
    return contratoRepository.atualizar(id, dados);
}

async function deletar(id) {
    return contratoRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
