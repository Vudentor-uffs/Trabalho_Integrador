import { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import logoSistema from "./assets/logoSistema.png";
import loginPortrait from "./assets/login-portrait.jpeg";
import "./Login.css";

export default function Login({ aoEntrar }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [textoMensagem, setTextoMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("success");

    async function enviaLogin(evento) {
        evento.preventDefault();
        try {
            const resposta = await axios.post("http://localhost:3000/login", {
                username: usuario.trim(),
                password: senha,
            });
            if (resposta.status >= 200 && resposta.status < 300) {
                localStorage.setItem("token", resposta.data.token);
                aoEntrar(usuario.trim());
            } else {
                console.error("Falha na autenticação");
            }
        } catch (erro) {
            console.error("Falha ao fazer login:", erro);
            setTextoMensagem(erro.response?.data?.erro || "Não foi possível fazer login. Confira seus dados e tente novamente.");
            setTipoMensagem("error");
        }
    }

    function informaRecuperacaoSenha() {
        setTextoMensagem("A recuperação de senha ainda não está disponível.");
        setTipoMensagem("info");
    }

    function informaLoginGoogle() {
        setTextoMensagem("O login com Google ainda não está configurado.");
        setTipoMensagem("info");
    }

    return (
        <Box component="main" className="login-page">
            <Box className="login-content">
                <Paper className="login-card" elevation={3}>
                    <Box component="header" className="login-card-header">
                        <Typography component="h1" variant="h4" className="login-title">
                            Login
                        </Typography>
                        <Box className="login-brand">
                            <img src={logoSistema} alt="Logo do sistema" />
                        </Box>
                    </Box>

                    <form className="login-form" onSubmit={enviaLogin}>
                        <TextField
                            required
                            fullWidth
                            id="username-input"
                            label="Usuário"
                            placeholder="Digite seu E-mail..."
                            value={usuario}
                            onChange={(evento) => setUsuario(evento.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            id="passwd-input"
                            label="Senha"
                            placeholder="Digite sua senha..."
                            type="password"
                            value={senha}
                            onChange={(evento) => setSenha(evento.target.value)}
                        />
                        <Button className="login-submit" variant="contained" type="submit">
                            Entrar
                        </Button>
                        <Box className="login-actions">
                            <Button
                                className="login-forgot-password"
                                variant="text"
                                type="button"
                                onClick={informaRecuperacaoSenha}
                            >
                                Esqueci minha senha
                            </Button>
                            <Button
                                className="login-google"
                                variant="outlined"
                                type="button"
                                onClick={informaLoginGoogle}
                            >
                                <span className="login-google-mark" aria-hidden="true">G</span>
                                Entrar com Google
                            </Button>
                        </Box>
                        {textoMensagem && (
                            <Alert
                                className="login-message"
                                severity={tipoMensagem}
                                role="status"
                            >
                                {textoMensagem}
                            </Alert>
                        )}
                    </form>
                </Paper>
            </Box>
            <Box className="login-visual">
                <img src={loginPortrait} alt="" />
            </Box>
        </Box>
    );
}
