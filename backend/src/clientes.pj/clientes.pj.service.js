const empresaRepository = require("./clientes.pj.repository");

async function listar() {
    return empresaRepository.listar();
}

async function buscarPorId(id) {
    return empresaRepository.buscarPorId(id);
}

async function criar(dados) {
    return empresaRepository.criar(dados);
}

async function atualizar(id, dados) {
    return empresaRepository.atualizar(id, dados);
}

async function deletar(id) {
    return empresaRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
