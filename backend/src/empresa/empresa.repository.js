const { Empresa } = require("../database/models");

const cnpj = "52693615000144";
async function buscar() {
    return Empresa.findByPk(cnpj);
}

async function atualizar(dados) {
    const empresa = await Empresa.findByPk(cnpj);
    if (!empresa) return null;
    return empresa.update(dados);
}

module.exports = {
    buscar,
    atualizar,
};
