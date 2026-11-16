const clientes_pjRepository = require("./clientes_pj.repository");

function validarCnpj(cnpj) {
    const limpo = String(cnpj || "").replace(/\D/g, "");
    if (limpo.length !== 14) {
        throw new Error("O CNPJ deve conter 14 dígitos.");
    }
    return limpo;
}
async function listar() {
    return clientes_pjRepository.listar();
}

async function buscarPorId(id) {
    return clientes_pjRepository.buscarPorId(id);
}

async function criar(dados) {
    dados.cnpj = validarCnpj(dados.cnpj);
    return clientes_pjRepository.criar(dados);
}

async function atualizar(id, dados) {
    if (dados.cnpj !== undefined) {
        dados.cnpj = validarCnpj(dados.cnpj);
    }
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
