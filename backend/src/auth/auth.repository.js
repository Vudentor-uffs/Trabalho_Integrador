const { Usuario, Permissao, UsuarioPermissao } = require("../database/models");


async function buscarPorEmail(email) {
    const usuario = await Usuario.findOne({where: {email: email}})
    
    return usuario;
}

async function buscarPorId(id) {
    return Usuario.findByPk(id);
}

async function criar(dados) {
    const {email, nome, senha} = dados;
    return await Usuario.create(dados);
}

async function buscarPermissaoPorDescricao(descricao) {
    return Permissao.findOne({
        where: { descricao: descricao },
    });
}

async function buscarUsuarioPermissao(email, idPermissao) {
    return UsuarioPermissao.findOne({
        where: {
            email: email,
            id_permissao: idPermissao,
        },
    });
}

async function listarPermissoesUsuario(email) {
    const permissoes = await UsuarioPermissao.findAll({
        where: {
            email: email,
        },
        include: [
            {
                model: Permissao,
                as: "Permissao",
            },
        ],
    });

    return permissoes.map((up) => up.Permissao);
}

module.exports = {
    buscarPorEmail,
    buscarPorId,
    criar,
    buscarPermissaoPorDescricao,
    buscarUsuarioPermissao,
    listarPermissoesUsuario,
};
