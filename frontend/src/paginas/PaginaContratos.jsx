import { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
    atualizarContrato,
    carregarDadosContratos,
    criarContrato,
    excluirContrato,
} from "../funcionalidades/contratos/contratosApi.js";
import ContratoFormularioDialog from "../funcionalidades/contratos/ContratoFormularioDialog.jsx";
import ContratosTabela from "../funcionalidades/contratos/ContratosTabela.jsx";
import "./Contratos.css";

const formularioVazio = {
    tipoCliente: "PF",
    clienteId: "",
    dataInicio: "",
    dataFim: "",
    valor: "",
    multa: "",
    validade: "",
    proposta: "",
};

function dataLocalAtual() {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${hoje.getFullYear()}-${mes}-${dia}`;
}

function obterNomeCliente(contrato, clientesPessoaFisica, clientesPessoaJuridica) {
    const pessoaFisica = clientesPessoaFisica.find(
        (cliente) => cliente.id === contrato.clientePfId,
    );
    if (pessoaFisica) return pessoaFisica.nome;

    const pessoaJuridica = clientesPessoaJuridica.find(
        (cliente) => cliente.id === contrato.clientePjId,
    );
    return pessoaJuridica?.nome || "Cliente não encontrado";
}

function obterErro(mensagem, erro) {
    return erro instanceof Error ? erro.message : mensagem;
}

export default function PaginaContratos() {
    const [contratos, setContratos] = useState([]);
    const [clientesPessoaFisica, setClientesPessoaFisica] = useState([]);
    const [clientesPessoaJuridica, setClientesPessoaJuridica] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [numeroTentativas, setNumeroTentativas] = useState(0);
    const [erro, setErro] = useState("");
    const [busca, setBusca] = useState("");
    const [filtroSituacao, setFiltroSituacao] = useState("todos");
    const [dialogoAberto, setDialogoAberto] = useState(false);
    const [contratoEmEdicao, setContratoEmEdicao] = useState(null);
    const [contratoParaExcluir, setContratoParaExcluir] = useState(null);
    const [formulario, setFormulario] = useState(formularioVazio);
    const [erroFormulario, setErroFormulario] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [excluindo, setExcluindo] = useState(false);

    useEffect(() => {
        let ativo = true;

        carregarDadosContratos()
            .then((dados) => {
                if (!ativo) return;
                if (
                    !Array.isArray(dados.contratos) ||
                    !Array.isArray(dados.clientesPessoaFisica) ||
                    !Array.isArray(dados.clientesPessoaJuridica)
                ) {
                    throw new Error(
                        "O servidor retornou dados de contratos em formato inesperado.",
                    );
                }
                setContratos(dados.contratos);
                setClientesPessoaFisica(dados.clientesPessoaFisica);
                setClientesPessoaJuridica(dados.clientesPessoaJuridica);
            })
            .catch((erroCarregamento) => {
                if (ativo) {
                    setErro(
                        obterErro(
                            "Não foi possível carregar os contratos. Verifique se o servidor está ativo.",
                            erroCarregamento,
                        ),
                    );
                }
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });

        return () => {
            ativo = false;
        };
    }, [numeroTentativas]);

    const contratosFiltrados = useMemo(() => {
        const termoBusca = busca.trim().toLocaleLowerCase("pt-BR");
        const hoje = dataLocalAtual();

        return contratos.filter((contrato) => {
            const nomeCliente = obterNomeCliente(
                contrato,
                clientesPessoaFisica,
                clientesPessoaJuridica,
            );
            const correspondeBusca =
                !termoBusca ||
                nomeCliente.toLocaleLowerCase("pt-BR").includes(termoBusca) ||
                String(contrato.id).includes(termoBusca);
            const encerrado = contrato.dataFim < hoje;
            const correspondeSituacao =
                filtroSituacao === "todos" ||
                (filtroSituacao === "ativos" && !encerrado) ||
                (filtroSituacao === "encerrados" && encerrado);

            return correspondeBusca && correspondeSituacao;
        });
    }, [busca, clientesPessoaFisica, clientesPessoaJuridica, contratos, filtroSituacao]);

    function abrirNovoContrato() {
        setContratoEmEdicao(null);
        setFormulario(formularioVazio);
        setErroFormulario("");
        setDialogoAberto(true);
    }

    function abrirEdicao(contrato) {
        setContratoEmEdicao(contrato);
        setFormulario({
            tipoCliente: contrato.clientePfId ? "PF" : "PJ",
            clienteId: String(contrato.clientePfId || contrato.clientePjId || ""),
            dataInicio: contrato.dataInicio || "",
            dataFim: contrato.dataFim || "",
            valor: String(contrato.valor ?? ""),
            multa: String(contrato.multa ?? ""),
            validade: String(contrato.validade ?? ""),
            proposta: contrato.proposta || "",
        });
        setErroFormulario("");
        setDialogoAberto(true);
    }

    function alterarCampo(campo, valor) {
        setFormulario((atual) => ({ ...atual, [campo]: valor }));
    }

    function validarFormulario() {
        if (!formulario.clienteId) return "Selecione o cliente do contrato.";
        if (!formulario.dataInicio || !formulario.dataFim) {
            return "Informe as datas de início e término.";
        }
        if (formulario.dataFim < formulario.dataInicio) {
            return "A data de término deve ser igual ou posterior à data de início.";
        }
        if (
            formulario.valor === "" ||
            !Number.isFinite(Number(formulario.valor)) ||
            Number(formulario.valor) < 0
        ) {
            return "Informe um valor contratual válido.";
        }
        if (
            formulario.multa === "" ||
            !Number.isFinite(Number(formulario.multa)) ||
            Number(formulario.multa) < 0
        ) {
            return "Informe uma multa contratual válida.";
        }
        if (!Number.isInteger(Number(formulario.validade)) || Number(formulario.validade) < 1) {
            return "Informe o prazo do contrato em meses.";
        }
        if (!formulario.proposta.trim()) return "Descreva a proposta do contrato.";
        return "";
    }

    async function salvar(evento) {
        evento.preventDefault();
        const mensagemErro = validarFormulario();
        if (mensagemErro) {
            setErroFormulario(mensagemErro);
            return;
        }

        const contrato = {
            clientePfId:
                formulario.tipoCliente === "PF" ? Number(formulario.clienteId) : null,
            clientePjId:
                formulario.tipoCliente === "PJ" ? Number(formulario.clienteId) : null,
            dataInicio: formulario.dataInicio,
            dataFim: formulario.dataFim,
            valor: Number(formulario.valor),
            multa: Number(formulario.multa),
            validade: Number(formulario.validade),
            proposta: formulario.proposta.trim(),
        };

        setSalvando(true);
        setErroFormulario("");
        try {
            let contratoSalvo;
            if (contratoEmEdicao) {
                contratoSalvo = await atualizarContrato(contratoEmEdicao.id, contrato);
                setContratos((atuais) =>
                    atuais.map((item) =>
                        item.id === contratoSalvo.id ? contratoSalvo : item,
                    ),
                );
            } else {
                contratoSalvo = await criarContrato(contrato);
                setContratos((atuais) => [...atuais, contratoSalvo]);
            }
            setDialogoAberto(false);
        } catch (erroAoSalvar) {
            setErroFormulario(
                obterErro("Não foi possível salvar o contrato.", erroAoSalvar),
            );
        } finally {
            setSalvando(false);
        }
    }

    async function confirmarExclusao() {
        if (!contratoParaExcluir) return;
        setExcluindo(true);
        setErro("");
        try {
            await excluirContrato(contratoParaExcluir.id);
            setContratos((atuais) =>
                atuais.filter((item) => item.id !== contratoParaExcluir.id),
            );
            setContratoParaExcluir(null);
        } catch (erroAoExcluir) {
            setErro(obterErro("Não foi possível excluir o contrato.", erroAoExcluir));
        } finally {
            setExcluindo(false);
        }
    }

    const clientesDisponiveis =
        formulario.tipoCliente === "PF"
            ? clientesPessoaFisica
            : clientesPessoaJuridica;

    return (
        <Box className="conteudo-contratos">
            <Box className="cabecalho-contratos">
                <Box>
                    <Typography component="h2" variant="h5">
                        Gerencie seus contratos
                    </Typography>
                    <Typography color="text.secondary">
                        Consulte e mantenha os contratos dos seus clientes.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={abrirNovoContrato}
                >
                    Novo contrato
                </Button>
            </Box>

            {erro && (
                <Alert severity="error" className="erro-contratos">
                    {erro}
                </Alert>
            )}

            <Card className="cartao-lista-contratos">
                <CardContent>
                    <Stack className="filtros-contratos" direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Buscar por cliente ou número"
                            value={busca}
                            onChange={(evento) => setBusca(evento.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: <SearchIcon color="action" />,
                                },
                            }}
                        />
                        <FormControl className="filtro-situacao-contratos">
                            <InputLabel id="filtro-situacao-label">Situação</InputLabel>
                            <Select
                                labelId="filtro-situacao-label"
                                label="Situação"
                                value={filtroSituacao}
                                onChange={(evento) => setFiltroSituacao(evento.target.value)}
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="ativos">Em andamento</MenuItem>
                                <MenuItem value="encerrados">Encerrados</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    {carregando ? (
                        <Box className="estado-contratos">
                            <CircularProgress aria-label="Carregando contratos" />
                        </Box>
                    ) : erro && contratos.length === 0 ? (
                        <Box className="estado-contratos">
                            <Typography variant="h6">
                                Não foi possível carregar os contratos
                            </Typography>
                            <Button
                                onClick={() => {
                                    setErro("");
                                    setCarregando(true);
                                    setNumeroTentativas((atual) => atual + 1);
                                }}
                            >
                                Tentar novamente
                            </Button>
                        </Box>
                    ) : contratosFiltrados.length === 0 ? (
                        <Box className="estado-contratos">
                            <Typography variant="h6">
                                {contratos.length === 0
                                    ? "Nenhum contrato cadastrado"
                                    : "Nenhum contrato encontrado"}
                            </Typography>
                            <Typography color="text.secondary">
                                {contratos.length === 0
                                    ? "Cadastre o primeiro contrato para começar."
                                    : "Tente mudar os filtros da busca."}
                            </Typography>
                        </Box>
                    ) : (
                        <ContratosTabela
                            contratos={contratosFiltrados}
                            pessoasFisicas={clientesPessoaFisica}
                            empresas={clientesPessoaJuridica}
                            aoEditar={abrirEdicao}
                            aoExcluir={setContratoParaExcluir}
                        />
                    )}
                </CardContent>
            </Card>

            <ContratoFormularioDialog
                aberto={dialogoAberto}
                editando={Boolean(contratoEmEdicao)}
                formulario={formulario}
                clientesDisponiveis={clientesDisponiveis}
                erro={erroFormulario}
                salvando={salvando}
                aoFechar={() => setDialogoAberto(false)}
                aoSalvar={salvar}
                aoAlterarCampo={alterarCampo}
            />

            <Dialog
                open={Boolean(contratoParaExcluir)}
                onClose={() => !excluindo && setContratoParaExcluir(null)}
            >
                <DialogTitle>Excluir contrato?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Essa ação removerá o contrato do sistema e não poderá ser desfeita.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setContratoParaExcluir(null)}
                        disabled={excluindo}
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={confirmarExclusao}
                        disabled={excluindo}
                        color="error"
                    >
                        {excluindo ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
