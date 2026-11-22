const { Contrato, ClientePf, ClientePj } = require("../database/models");

async function buscarDados() {
    const [contratos, clientesPessoaFisica, clientesPessoaJuridica] = await Promise.all([
        Contrato.findAll({
            attributes: ["id", "proposta"],
            order: [
                ["dataInicio", "DESC"],
                ["id", "DESC"],
            ],
            include: [
                { model: ClientePf, as: "clientePf", attributes: ["id", "nome"] },
                { model: ClientePj, as: "clientePj", attributes: ["id", "nome"] },
            ],
        }),
        ClientePf.findAll({
            attributes: ["id", "nome"],
            order: [["nome", "ASC"]],
        }),
        ClientePj.findAll({
            attributes: ["id", "nome"],
            order: [["nome", "ASC"]],
        }),
    ]);

    return {
        contratos,
        clientesPessoaFisica,
        clientesPessoaJuridica,
    };
}

module.exports = { buscarDados };