const { Op } = require("sequelize");
const { ClientePf, ClientePj, Contrato } = require("../database/models");

async function listar({ busca, tipo, clientePjId, ordenarPor = "id", ordem = "ASC" } = {}) {
    const where = {};

    // Filtragem textual (busca por nome/CPF/e-mail)
    if (busca) {
        const apenasNumeros = String(busca).replace(/\D/g, "");
        where[Op.or] = [
            { nome: { [Op.iLike]: `%${busca}%` } },
            { email: { [Op.iLike]: `%${busca}%` } },
            ...(apenasNumeros ? [{ cpf: { [Op.like]: `%${apenasNumeros}%` } }] : []),
        ];
    }

    // Filtragem por categoria (Normal/Colaborador)
    if (tipo === "Normal" || tipo === "Colaborador") {
        where.tipo = tipo;
    }

    // Filtragem por empresa vinculada
    if (clientePjId) {
        where.clientePjId = Number(clientePjId);
    }

    // Ordenação via whitelist (proteção contra SQL Injection)
    const camposPermitidos = ["id", "nome", "cpf", "email", "tipo", "dataNascimento"];
    const colunaOrdenacao = camposPermitidos.includes(ordenarPor) ? ordenarPor : "nome";
    const direcaoOrdenacao = String(ordem).toUpperCase() === "DESC" ? "DESC" : "ASC";

    return ClientePf.findAll({
        where,
        order: [[colunaOrdenacao, direcaoOrdenacao]],
    });
}

async function buscarPorId(id) {
    return ClientePf.findByPk(id);
}

async function criar(dados) {
    return ClientePf.create(dados);
}

async function atualizar(id, dados) {
    const cliente_pf = await ClientePf.findByPk(id);
    if (!cliente_pf) return null;
    return cliente_pf.update(dados);
}

async function deletar(id) {
    const cliente_pf = await ClientePf.findByPk(id);
    if (!cliente_pf) return null;
    await cliente_pf.destroy();
    return cliente_pf;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
