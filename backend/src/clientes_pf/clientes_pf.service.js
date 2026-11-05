const clientes_pfRepository = require("./clientes_pf.repository");

async function listar() {
    return clientes_pfRepository.listar();
}

async function buscarPorId(id) {
    return clientes_pfRepository.buscarPorId(id);
}

async function criar(dados) {
    return clientes_pfRepository.criar(dados);
}

async function atualizar(id, dados) {
    return clientes_pfRepository.atualizar(id, dados);
}

async function deletar(id) {
    return clientes_pfRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
