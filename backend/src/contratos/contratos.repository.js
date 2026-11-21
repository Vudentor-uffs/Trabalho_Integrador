const { Op } = require("sequelize");
const { Contrato, ClientePf, ClientePj } = require("../database/models");

const incluirCliente = [
    { model: ClientePf, as: "clientePf", attributes: ["id", "nome"] },
    { model: ClientePj, as: "clientePj", attributes: ["id", "nome"] },
];

async function listar({tipoCliente, dataInicioMin, dataFimMax, ordenarPor = "id", ordem = "ASC" } = {}) {
    const where = {};

    // Filtragem por categoria (PF/PJ)
    if (tipoCliente === "PF") {
        where.clientePfId = { [Op.ne]: null };
    } else if (tipoCliente === "PJ") {
        where.clientePjId = { [Op.ne]: null };
    }

    // Filtragem por datas
    if (dataInicioMin) {
        where.dataInicio = { [Op.gte]: dataInicioMin };
    }
    if (dataFimMax) {
        where.dataFim = { [Op.lte]: dataFimMax };
    }

    // Ordenação 
    const camposPermitidos = ["id", "valor", "dataInicio", "dataFim", "validade"];
    const colunaOrdenacao = camposPermitidos.includes(ordenarPor) ? ordenarPor : "id";
    const direcaoOrdenacao = String(ordem).toUpperCase() === "DESC" ? "DESC" : "ASC";

    return Contrato.findAll({
        where,
        include: incluirCliente,
        order: [[colunaOrdenacao, direcaoOrdenacao]],
    });
}

async function buscarPorId(id) {
    return Contrato.findByPk(id, { include: incluirCliente });
}

async function criar(dados) {
    return Contrato.create(dados);
}

async function atualizar(id, dados) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) return null;
    return contrato.update(dados);
}

async function deletar(id) {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) return null;
    await contrato.destroy();
    return contrato;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
