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
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
    atualizarPessoaFisica,
    atualizarPessoaJuridica,
    carregarClientes,
    criarPessoaFisica,
    criarPessoaJuridica,
    excluirPessoaFisica,
    excluirPessoaJuridica,
} from "../funcionalidades/clientes/clientesApi.js";
import ClienteFormularioDialog from "../funcionalidades/clientes/ClienteFormularioDialog.jsx";
import ClientesTabela from "../funcionalidades/clientes/ClientesTabela.jsx";
import "./Clientes.css";

const formularioPessoaFisicaVazio = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    tipo: "Normal",
    clientePjId: "",
};

const formularioPessoaJuridicaVazio = {
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
};

function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}

function dataAtualLocal() {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${hoje.getFullYear()}-${mes}-${dia}`;
}

function erroDaOperacao(erro, mensagemPadrao) {
    return erro instanceof Error ? erro.message : mensagemPadrao;
}

export default function PaginaClientes() {
    const [tipoLista, setTipoLista] = useState("PF");
    const [pessoasFisicas, setPessoasFisicas] = useState([]);
    const [pessoasJuridicas, setPessoasJuridicas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [busca, setBusca] = useState("");
    const [filtroCliente, setFiltroCliente] = useState("todos");
    const [ordenacao, setOrdenacao] = useState("nome-asc");
    const [dialogoAberto, setDialogoAberto] = useState(false);
    const [itemEmEdicao, setItemEmEdicao] = useState(null);
    const [itemParaExcluir, setItemParaExcluir] = useState(null);
    const [formularioPessoaFisica, setFormularioPessoaFisica] = useState(
        formularioPessoaFisicaVazio,
    );
    const [formularioPessoaJuridica, setFormularioPessoaJuridica] = useState(
        formularioPessoaJuridicaVazio,
    );
    const [erroFormulario, setErroFormulario] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [excluindo, setExcluindo] = useState(false);
    const [tentativaCarregamento, setTentativaCarregamento] = useState(0);

    useEffect(() => {
        let ativo = true;

        carregarClientes()
            .then((dados) => {
                if (!ativo) return;
                if (
                    !Array.isArray(dados.pessoasFisicas) ||
                    !Array.isArray(dados.pessoasJuridicas)
                ) {
                    throw new Error("O servidor retornou clientes em formato inesperado.");
                }
                setPessoasFisicas(dados.pessoasFisicas);
                setPessoasJuridicas(dados.pessoasJuridicas);
                setErro("");
            })
            .catch((erroCarregamento) => {
                if (ativo) {
                    setErro(
                        erroDaOperacao(
                            erroCarregamento,
                            "Não foi possível carregar os clientes. Verifique se o servidor está ativo.",
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
    }, [tentativaCarregamento]);

    const registros = tipoLista === "PF" ? pessoasFisicas : pessoasJuridicas;
    const registrosFiltrados = useMemo(() => {
        const termo = busca.trim().toLocaleLowerCase("pt-BR");
        const termoNumerico = somenteNumeros(termo);

        const filtrados = registros.filter((cliente) => {
            const documento = tipoLista === "PF" ? cliente.cpf : cliente.cnpj;
            const correspondeBusca =
                !termo ||
                String(cliente.nome || "").toLocaleLowerCase("pt-BR").includes(termo) ||
                String(cliente.email || "").toLocaleLowerCase("pt-BR").includes(termo) ||
                (termoNumerico && String(documento || "").includes(termoNumerico));
            const correspondeTipo =
                filtroCliente === "todos" ||
                (tipoLista === "PF" && cliente.tipo === filtroCliente) ||
                (tipoLista === "PJ" &&
                    (filtroCliente === "com-contratos"
                        ? cliente.contratos?.length > 0
                        : !cliente.contratos?.length));

            return correspondeBusca && correspondeTipo;
        });

        return filtrados.sort((primeiro, segundo) => {
            if (ordenacao === "nome-desc") {
                return segundo.nome.localeCompare(primeiro.nome, "pt-BR");
            }
            if (ordenacao === "recentes") return Number(segundo.id) - Number(primeiro.id);
            return primeiro.nome.localeCompare(segundo.nome, "pt-BR");
        });
    }, [busca, filtroCliente, ordenacao, registros, tipoLista]);

    function mudarTipoLista(_, valor) {
        setTipoLista(valor);
        setBusca("");
        setFiltroCliente("todos");
    }

    function abrirNovoCliente() {
        setItemEmEdicao(null);
        setErroFormulario("");
        setFormularioPessoaFisica(formularioPessoaFisicaVazio);
        setFormularioPessoaJuridica(formularioPessoaJuridicaVazio);
        setDialogoAberto(true);
    }

    function abrirEdicao(cliente) {
        setItemEmEdicao(cliente);
        setErroFormulario("");
        if (tipoLista === "PF") {
            setFormularioPessoaFisica({
                nome: cliente.nome || "",
                cpf: cliente.cpf || "",
                dataNascimento: cliente.dataNascimento || "",
                telefone: cliente.telefone || "",
                email: cliente.email || "",
                tipo: cliente.tipo || "Normal",
                clientePjId: cliente.clientePjId ? String(cliente.clientePjId) : "",
            });
        } else {
            setFormularioPessoaJuridica({
                nome: cliente.nome || "",
                cnpj: cliente.cnpj || "",
                email: cliente.email || "",
                telefone: cliente.telefone || "",
                endereco: cliente.endereco || "",
            });
        }
        setDialogoAberto(true);
    }

    function alterarPessoaFisica(campo, valor) {
        setFormularioPessoaFisica((atual) => ({ ...atual, [campo]: valor }));
    }

    function alterarPessoaJuridica(campo, valor) {
        setFormularioPessoaJuridica((atual) => ({ ...atual, [campo]: valor }));
    }

    function validarFormulario() {
        if (tipoLista === "PF") {
            const cpf = somenteNumeros(formularioPessoaFisica.cpf);
            if (cpf.length !== 11) return "O CPF deve conter 11 números.";
            if (!formularioPessoaFisica.dataNascimento) {
                return "Informe a data de nascimento.";
            }
            if (formularioPessoaFisica.dataNascimento > dataAtualLocal()) {
                return "A data de nascimento não pode ser futura.";
            }
            if (
                formularioPessoaFisica.tipo === "Colaborador" &&
                !formularioPessoaFisica.clientePjId
            ) {
                return "Selecione a empresa à qual o colaborador está vinculado.";
            }
        } else if (somenteNumeros(formularioPessoaJuridica.cnpj).length !== 14) {
            return "O CNPJ deve conter 14 números.";
        }
        return "";
    }

    async function salvar(evento) {
        evento.preventDefault();
        const mensagemErro = validarFormulario();
        if (mensagemErro) {
            setErroFormulario(mensagemErro);
            return;
        }

        setSalvando(true);
        setErroFormulario("");
        try {
            if (tipoLista === "PF") {
                const dados = {
                    ...formularioPessoaFisica,
                    cpf: somenteNumeros(formularioPessoaFisica.cpf),
                    clientePjId:
                        formularioPessoaFisica.tipo === "Colaborador"
                            ? Number(formularioPessoaFisica.clientePjId)
                            : null,
                };
                const cliente = itemEmEdicao
                    ? await atualizarPessoaFisica(itemEmEdicao.id, dados)
                    : await criarPessoaFisica(dados);
                setPessoasFisicas((atuais) =>
                    itemEmEdicao
                        ? atuais.map((item) => (item.id === cliente.id ? cliente : item))
                        : [...atuais, cliente],
                );
            } else {
                const dados = {
                    ...formularioPessoaJuridica,
                    cnpj: somenteNumeros(formularioPessoaJuridica.cnpj),
                };
                const cliente = itemEmEdicao
                    ? await atualizarPessoaJuridica(itemEmEdicao.id, dados)
                    : await criarPessoaJuridica(dados);
                setPessoasJuridicas((atuais) =>
                    itemEmEdicao
                        ? atuais.map((item) => (item.id === cliente.id ? cliente : item))
                        : [...atuais, cliente],
                );
            }
            setDialogoAberto(false);
        } catch (erroAoSalvar) {
            setErroFormulario(
                erroDaOperacao(erroAoSalvar, "Não foi possível salvar o cliente."),
            );
        } finally {
            setSalvando(false);
        }
    }

    async function confirmarExclusao() {
        if (!itemParaExcluir) return;
        setExcluindo(true);
        setErro("");
        try {
            if (tipoLista === "PF") {
                await excluirPessoaFisica(itemParaExcluir.id);
                setPessoasFisicas((atuais) =>
                    atuais.filter((item) => item.id !== itemParaExcluir.id),
                );
            } else {
                await excluirPessoaJuridica(itemParaExcluir.id);
                setPessoasJuridicas((atuais) =>
                    atuais.filter((item) => item.id !== itemParaExcluir.id),
                );
            }
            setItemParaExcluir(null);
        } catch (erroAoExcluir) {
            setErro(
                erroDaOperacao(
                    erroAoExcluir,
                    "Não foi possível excluir o cliente. Ele pode estar vinculado a contratos ou colaboradores.",
                ),
            );
        } finally {
            setExcluindo(false);
        }
    }

    const dadosPessoaFisica = tipoLista === "PF";

    return (
        <Box className="conteudo-clientes">
            <Box className="cabecalho-clientes">
                <Box>
                    <Typography component="h2" variant="h5">
                        Cadastro e acompanhamento
                    </Typography>
                    <Typography color="text.secondary">
                        Gerencie clientes pessoa física e pessoa jurídica.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={abrirNovoCliente}
                >
                    {tipoLista === "PF" ? "Cadastrar pessoa" : "Cadastrar empresa"}
                </Button>
            </Box>

            {erro && (
                <Alert
                    severity="error"
                    action={
                        erro && (
                            <Button
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErro("");
                                    setCarregando(true);
                                    setTentativaCarregamento((atual) => atual + 1);
                                }}
                            >
                                Tentar novamente
                            </Button>
                        )
                    }
                >
                    {erro}
                </Alert>
            )}

            <Card className="cartao-lista-clientes">
                <CardContent>
                    <Tabs
                        value={tipoLista}
                        onChange={mudarTipoLista}
                        aria-label="Tipo de cliente"
                        className="abas-clientes"
                    >
                        <Tab value="PF" label={`Pessoa física (${pessoasFisicas.length})`} />
                        <Tab value="PJ" label={`Pessoa jurídica (${pessoasJuridicas.length})`} />
                    </Tabs>
                    <Stack className="filtros-clientes" direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            label="Buscar por nome, documento ou e-mail"
                            value={busca}
                            onChange={(evento) => setBusca(evento.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: <SearchIcon color="action" />,
                                },
                            }}
                        />
                        <FormControl className="filtro-tipo-cliente">
                            <InputLabel id="filtro-tipo-cliente-label">Filtrar</InputLabel>
                            <Select
                                labelId="filtro-tipo-cliente-label"
                                label="Filtrar"
                                value={filtroCliente}
                                onChange={(evento) => setFiltroCliente(evento.target.value)}
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                {tipoLista === "PF" ? (
                                    [
                                        <MenuItem key="Normal" value="Normal">Clientes</MenuItem>,
                                        <MenuItem key="Colaborador" value="Colaborador">
                                            Colaboradores
                                        </MenuItem>,
                                    ]
                                ) : (
                                    [
                                        <MenuItem key="com-contratos" value="com-contratos">
                                            Com contratos
                                        </MenuItem>,
                                        <MenuItem key="sem-contratos" value="sem-contratos">
                                            Sem contratos
                                        </MenuItem>,
                                    ]
                                )}
                            </Select>
                        </FormControl>
                        <FormControl className="ordenacao-clientes">
                            <InputLabel id="ordenacao-clientes-label">Ordenar</InputLabel>
                            <Select
                                labelId="ordenacao-clientes-label"
                                label="Ordenar"
                                value={ordenacao}
                                onChange={(evento) => setOrdenacao(evento.target.value)}
                            >
                                <MenuItem value="nome-asc">Nome (A–Z)</MenuItem>
                                <MenuItem value="nome-desc">Nome (Z–A)</MenuItem>
                                <MenuItem value="recentes">Mais recentes</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    {carregando ? (
                        <Box className="estado-clientes">
                            <CircularProgress aria-label="Carregando clientes" />
                        </Box>
                    ) : registrosFiltrados.length === 0 ? (
                        <Box className="estado-clientes">
                            <Typography variant="h6">
                                {registros.length === 0
                                    ? "Nenhum cliente cadastrado"
                                    : "Nenhum cliente encontrado"}
                            </Typography>
                            <Typography color="text.secondary">
                                {registros.length === 0
                                    ? "Cadastre o primeiro cliente deste tipo."
                                    : "Tente buscar por outro nome, documento ou e-mail."}
                            </Typography>
                        </Box>
                    ) : (
                        <ClientesTabela
                            clientes={registrosFiltrados}
                            pessoasJuridicas={pessoasJuridicas}
                            pessoaFisica={dadosPessoaFisica}
                            aoEditar={abrirEdicao}
                            aoExcluir={setItemParaExcluir}
                        />
                    )}
                </CardContent>
            </Card>

            <ClienteFormularioDialog
                aberto={dialogoAberto}
                editando={Boolean(itemEmEdicao)}
                pessoaFisica={dadosPessoaFisica}
                formularioPessoaFisica={formularioPessoaFisica}
                formularioPessoaJuridica={formularioPessoaJuridica}
                empresas={pessoasJuridicas}
                erro={erroFormulario}
                salvando={salvando}
                aoFechar={() => setDialogoAberto(false)}
                aoSalvar={salvar}
                aoAlterarPessoaFisica={alterarPessoaFisica}
                aoAlterarPessoaJuridica={alterarPessoaJuridica}
                somenteNumeros={somenteNumeros}
            />

            <Dialog
                open={Boolean(itemParaExcluir)}
                onClose={() => !excluindo && setItemParaExcluir(null)}
            >
                <DialogTitle>Excluir cliente?</DialogTitle>
                <DialogContent>
                    <Typography>
                        A exclusão pode ser impedida se o cliente estiver vinculado a um contrato.
                    </Typography>
                    {erro && <Alert severity="error">{erro}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setItemParaExcluir(null);
                            setErro("");
                        }}
                        disabled={excluindo}
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button onClick={confirmarExclusao} disabled={excluindo} color="error">
                        {excluindo ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
