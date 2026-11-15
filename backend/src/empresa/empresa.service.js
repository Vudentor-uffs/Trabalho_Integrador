const empresaRepository = require("./empresa.repository");

async function buscar() {
    return empresaRepository.buscar();
}

async function atualizar(dados) {
    return empresaRepository.atualizar(dados);
}

module.exports = {
    buscar,
    atualizar,
};
