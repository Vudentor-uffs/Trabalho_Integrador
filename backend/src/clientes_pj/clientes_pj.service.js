const clientes_pjRepository = require("./clientes_pj.repository");

async function listar() {
    return clientes_pjRepository.listar();
}

async function buscarPorId(id) {
    return clientes_pjRepository.buscarPorId(id);
}

async function criar(dados) {
    return clientes_pjRepository.criar(dados);
}

async function atualizar(id, dados) {
    return clientes_pjRepository.atualizar(id, dados);
}

async function deletar(id) {
    return clientes_pjRepository.deletar(id);
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
