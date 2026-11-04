const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRepository = require("./auth.repository");

async function autenticarUsuario(email, senha) {
    
    const usuario = await authRepository.buscarPorEmail(email);

    if (!usuario) {
        return { sucesso: false, mensagem: "Usuário incorreto." };
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (senhaValida) {
        return { sucesso: true, usuario: usuario };
    } else {
        return { sucesso: false, mensagem: "Senha incorreta." };
    }
}

async function criarNovoUsuario(dados) {
    const { username, passwd, nome } = dados;
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const senhaHash = await bcrypt.hashSync(passwd, salt);

    const usuario = await authRepository.criar({
        email: username,
        nome: nome || username,
        senha: senhaHash,
    });

    return { email: usuario.email, nome: usuario.nome };
}

function gerarToken(username) {
    return jwt.sign(
        { username: username },
        "your-secret-key",
        { expiresIn: "1h" }
    );
}

async function verificarPermissaoPorDescricao(email, descricaoPermissao) {
    try {
        const permissao = await authRepository.buscarPermissaoPorDescricao(descricaoPermissao);

        if (!permissao) {
            return false;
        }

        const usuarioPermissao = await authRepository.buscarUsuarioPermissao(email, permissao.id);

        return usuarioPermissao !== null;
    } catch (erro) {
        console.error("Erro ao verificar permissão:", erro);
        return false;
    }
}

async function obterPermissoesUsuario(email) {
    try {
        return await authRepository.listarPermissoesUsuario(email);
    } catch (erro) {
        console.error("Erro ao obter permissões do usuário:", erro);
        return [];
    }
}

module.exports = {
    autenticarUsuario,
    criarNovoUsuario,
    gerarToken,
    verificarPermissaoPorDescricao,
    obterPermissoesUsuario,
};
