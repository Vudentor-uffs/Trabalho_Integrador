const jwt = require("jsonwebtoken");
const authService = require("./auth.service");

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const resultado = await authService.autenticarUsuario(username, password);

        if (!resultado.sucesso) {
            return res.status(401).json({ erro: resultado.mensagem });
        }

        const administrador = await usuarioEhAdministrador(username);
        const token = jwt.sign(
            { username: username },
            "your-secret-key",
            { expiresIn: "1h" },
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            administrador,
            nome: resultado.usuario.nome,
        });

    } catch (erro) {
        console.log("Erro ao fazer login:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function logout(req, res) {
    try {
        req.logout(function (err) {
            if (err) {
                console.log("Erro ao fazer logout:", err);
                return res.status(500).json({ erro: err.message });
            }
            return res.status(200).json({ message: "Logout successful" });
        });
    } catch (erro) {
        console.log("Erro ao fazer logout:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function usuarioEhAdministrador(email) {
    const permissoes = await authService.obterPermissoesUsuario(email);
    return permissoes.some((permissao) => permissao.descricao === "ADMIN");
}

async function obterSessao(req, res) {
    try {
        return res.status(200).json({
            email: req.user.email,
            nome: req.user.nome,
            administrador: await usuarioEhAdministrador(req.user.email),
        });
    } catch (erro) {
        console.error("Erro ao consultar o perfil do usuário:", erro);
        return res.status(500).json({ erro: "Não foi possível consultar o perfil do usuário." });
    }
}

async function criarUsuario(req, res) {
    try {

        const novoUsuario = await authService.criarNovoUsuario(req.body);

        console.log("Usuário inserido");
        
        return res.status(201).json(novoUsuario);

    } catch (erro) {
        console.log("Erro ao criar usuário:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    login,
    logout,
    obterSessao,
    criarUsuario,
};
