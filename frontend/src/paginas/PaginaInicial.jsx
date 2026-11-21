import { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { carregarDadosContratos } from "../funcionalidades/contratos/contratosApi.js";
import CartaoResumo from "../funcionalidades/dashboard/CartaoResumo.jsx";
import ContratosRecentes from "../funcionalidades/dashboard/ContratosRecentes.jsx";
import GraficoComposicaoClientes from "../funcionalidades/dashboard/GraficoComposicaoClientes.jsx";
import GraficoSituacaoContratos from "../funcionalidades/dashboard/GraficoSituacaoContratos.jsx";

function dataLocalAtual() {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

function statusDoContrato(contrato, hoje) {
    if (contrato.dataInicio > hoje) return "A iniciar";
    if (contrato.dataFim < hoje) return "Encerrados";
    return "Vigentes";
}

function resumirDados(dados) {
    const hoje = dataLocalAtual();
    const contratosPorSituacao = {
        Vigentes: 0,
        "A iniciar": 0,
        Encerrados: 0,
    };

    dados.contratos.forEach((contrato) => {
        contratosPorSituacao[statusDoContrato(contrato, hoje)] += 1;
    });

    const totalClientes =
        dados.clientesPessoaFisica.length + dados.clientesPessoaJuridica.length;

    return {
        contratosPorSituacao,
        percentualPessoasFisicas: totalClientes
            ? (dados.clientesPessoaFisica.length / totalClientes) * 100
            : 0,
        totalClientes,
        totalContratos: dados.contratos.length,
        maximoContratos: Math.max(1, ...Object.values(contratosPorSituacao)),
    };
}

export default function PaginaInicial({ aoAbrirPagina }) {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let ativo = true;
        carregarDadosContratos()
            .then((resultado) => {
                if (
                    !Array.isArray(resultado.contratos) ||
                    !Array.isArray(resultado.clientesPessoaFisica) ||
                    !Array.isArray(resultado.clientesPessoaJuridica)
                ) {
                    throw new Error("O servidor retornou dados inválidos para o dashboard.");
                }
                if (ativo) {
                    setDados(resultado);
                    setErro("");
                }
            })
            .catch((erroCarregamento) => {
                console.error("Não foi possível carregar o dashboard:", erroCarregamento);
                if (ativo) {
                    setErro(
                        erroCarregamento.response?.data?.erro ||
                            erroCarregamento.message ||
                            "Não foi possível carregar os dados do dashboard.",
                    );
                }
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });
        return () => {
            ativo = false;
        };
    }, [tentativa]);

    const resumo = useMemo(() => (dados ? resumirDados(dados) : null), [dados]);
    const contratosRecentes = useMemo(
        () =>
            dados
                ? [...dados.contratos]
                    .sort((a, b) => b.dataInicio.localeCompare(a.dataInicio))
                    .slice(0, 5)
                : [],
        [dados],
    );

    function tentarNovamente() {
        setCarregando(true);
        setTentativa((atual) => atual + 1);
    }

    return (
        <Box className="conteudo-dashboard">
            {erro && (
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={tentarNovamente}>
                            Tentar novamente
                        </Button>
                    }
                >
                    {erro}
                </Alert>
            )}
            {carregando ? (
                <Box className="estado-dashboard">
                    <CircularProgress aria-label="Carregando dados do dashboard" />
                </Box>
            ) : resumo ? (
                <>
                    <Box className="cartoes-resumo-dashboard-lista">
                        <CartaoResumo
                            icone={GroupsOutlinedIcon}
                            titulo="Clientes cadastrados"
                            valor={resumo.totalClientes}
                            descricao="Pessoas físicas e empresas"
                        />
                        <CartaoResumo
                            icone={PersonOutlineOutlinedIcon}
                            titulo="Pessoas físicas"
                            valor={dados.clientesPessoaFisica.length}
                            descricao="Clientes e colaboradores"
                        />
                        <CartaoResumo
                            icone={BusinessOutlinedIcon}
                            titulo="Empresas"
                            valor={dados.clientesPessoaJuridica.length}
                            descricao="Pessoas jurídicas cadastradas"
                        />
                        <CartaoResumo
                            icone={AssignmentOutlinedIcon}
                            titulo="Contratos vigentes"
                            valor={resumo.contratosPorSituacao.Vigentes}
                            descricao={`${resumo.totalContratos} contratos no total`}
                        />
                    </Box>

                    <Box className="grade-dashboard">
                        <GraficoSituacaoContratos
                            quantidades={resumo.contratosPorSituacao}
                            maximo={resumo.maximoContratos}
                        />
                        <GraficoComposicaoClientes
                            pessoasFisicas={dados.clientesPessoaFisica.length}
                            empresas={dados.clientesPessoaJuridica.length}
                            total={resumo.totalClientes}
                            percentualPessoasFisicas={resumo.percentualPessoasFisicas}
                        />
                        <ContratosRecentes
                            contratos={contratosRecentes}
                            pessoasFisicas={dados.clientesPessoaFisica}
                            empresas={dados.clientesPessoaJuridica}
                            aoVerContratos={() => aoAbrirPagina("Contratos")}
                        />
                    </Box>
                </>
            ) : null}
        </Box>
    );
}
