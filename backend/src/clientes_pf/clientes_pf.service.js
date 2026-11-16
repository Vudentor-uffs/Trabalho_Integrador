const clientes_pfRepository = require("./clientes_pf.repository");

function validarCpf(cpf) {
    const limpo = String(cpf || "").replace(/\D/g, "");
    if (limpo.length !== 11) {
        throw new Error("O CPF deve conter 11 dígitos.");
    }
    return limpo;
}

function validarRegrasNegocio(dados, isCriacao = true) {
    if (isCriacao || dados.cpf !== undefined) {
        dados.cpf = validarCpf(dados.cpf);
    }

    if (dados.tipo !== undefined && !["Normal", "Colaborador"].includes(dados.tipo)) {
        throw new Error("O tipo do cliente deve ser 'Normal' ou 'Colaborador'.");
    }

    // Se for Colaborador, exige empresa vinculada; se Normal, limpa vínculo opcional se vier vazio
    if (dados.tipo === "Colaborador" && !dados.clientePjId) {
        throw new Error("Clientes do tipo 'Colaborador' devem estar vinculados a uma empresa.");
    }
}

async function listar(filtros) {
    return clientes_pfRepository.listar(filtros);
}

async function buscarPorId(id) {
    return clientes_pfRepository.buscarPorId(id);
}

async function criar(dados) {
    validarRegrasNegocio(dados, true);
    return clientes_pfRepository.criar(dados);
}

async function atualizar(id, dados) {
    validarRegrasNegocio(dados, false);
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
