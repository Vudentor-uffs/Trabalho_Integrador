import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, Button, CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import PainelPrincipal from "./PainelPrincipal.jsx";
import Login from "./Login.jsx";
import tema from "./tema.js";

function App() {
    const [emailUsuario, setEmailUsuario] = useState("");
    const [verificandoSessao, setVerificandoSessao] = useState(true);
    const [erroSessao, setErroSessao] = useState("");
    const [tentativaSessao, setTentativaSessao] = useState(0);

    function aoEntrar(email) {
        setEmailUsuario(email);
    }

    useEffect(() => {
        let ativo = true;

        async function restaurarSessao() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    if (ativo) setEmailUsuario("");
                    return;
                }

                const resposta = await axios.get("http://localhost:3000/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (typeof resposta.data.email !== "string" || !resposta.data.email) {
                    throw new Error("O backend retornou dados inválidos para a sessão.");
                }
                if (ativo) {
                    setEmailUsuario(resposta.data.email);
                    setErroSessao("");
                }
            } catch (erro) {
                if (erro.response?.status === 401 || erro.response?.status === 403) {
                    try {
                        localStorage.removeItem("token");
                    } catch (erroArmazenamento) {
                        console.error("Não foi possível remover o token inválido:", erroArmazenamento);
                    }
                    if (ativo) setEmailUsuario("");
                } else {
                    console.error("Não foi possível restaurar a sessão:", erro);
                    if (ativo) {
                        setErroSessao(
                            "Não foi possível verificar sua sessão. Confira se o backend está ativo e tente novamente.",
                        );
                    }
                }
            } finally {
                if (ativo) setVerificandoSessao(false);
            }
        }

        restaurarSessao();
        return () => {
            ativo = false;
        };
    }, [tentativaSessao]);

    function sair() {
        try {
            localStorage.removeItem("token");
        } catch (erro) {
            console.error("Não foi possível remover o token salvo:", erro);
        }
        setEmailUsuario("");
    }

    return (
        <ThemeProvider theme={tema}>
            <CssBaseline />
            <div className="App">
                {verificandoSessao ? (
                    <Box
                        role="status"
                        sx={{
                            display: "flex",
                            minHeight: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress aria-label="Verificando sessão" />
                    </Box>
                ) : erroSessao ? (
                    <Box
                        sx={{
                            display: "flex",
                            minHeight: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 3,
                        }}
                    >
                        <Alert
                            severity="error"
                            action={
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        setVerificandoSessao(true);
                                        setTentativaSessao((atual) => atual + 1);
                                    }}
                                >
                                    Tentar novamente
                                </Button>
                            }
                        >
                            {erroSessao}
                        </Alert>
                    </Box>
                ) : emailUsuario ? (
                    <PainelPrincipal emailUsuario={emailUsuario} aoSair={sair} />
                ) : (
                    <Login aoEntrar={aoEntrar} />
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
