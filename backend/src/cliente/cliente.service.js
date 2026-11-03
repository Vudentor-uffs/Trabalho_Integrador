const clienteRepository = require("./cliente.repository");

async function listar() {
    return clienteRepository.listar();
}

async function buscarPorId(id) {
    return clienteRepository.buscarPorId(id);
}

async function criar(dados) {
    return clienteRepository.criar(dados);
}

async function atualizar(id, dados) {
    return clienteRepository.atualizar(id, dados);
}

async function deletar(id) {
    return clienteRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
