const { Op } = require("sequelize");
const { ClientePj, ClientePf, Contrato } = require("../database/models");

async function listar({ busca, comContratos, ordenarPor = "id", ordem = "ASC" } = {}) {
    const where = {};

    // Filtragem textual (busca por nome/CNPJ/e-mail)
    if (busca) {
        const apenasNumeros = String(busca).replace(/\D/g, "");
        where[Op.or] = [
            { nome: { [Op.iLike]: `%${busca}%` } },
            { email: { [Op.iLike]: `%${busca}%` } },
            ...(apenasNumeros ? [{ cnpj: { [Op.like]: `%${apenasNumeros}%` } }] : []),
        ];
    }

    // Ordenação 
    const camposPermitidos = ["id", "nome", "cnpj", "email"];
    const colunaOrdenacao = camposPermitidos.includes(ordenarPor) ? ordenarPor : "nome";
    const direcaoOrdenacao = String(ordem).toUpperCase() === "DESC" ? "DESC" : "ASC";

    // Filtragem por categoria (empresas com contratos ativos/cadastrados)
    const include = [
        { model: ClientePf, as: "colaboradores" },
        {
            model: Contrato,
            as: "contratos",
            required: comContratos === "true", // INNER JOIN se true, LEFT JOIN caso contrário
        },
    ];

    return ClientePj.findAll({
        where,
        order: [[colunaOrdenacao, direcaoOrdenacao]], include
    });
}

async function buscarPorId(id) {
    return ClientePj.findByPk(id);
}

async function criar(dados) {
    return ClientePj.create(dados);
}

async function atualizar(id, dados) {
    const cliente_pj = await ClientePj.findByPk(id);
    if (!cliente_pj) return null;
    return cliente_pj.update(dados);
}

async function deletar(id) {
    const cliente_pj = await ClientePj.findByPk(id);
    if (!cliente_pj) return null;
    await cliente_pj.destroy();
    return cliente_pj;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};
