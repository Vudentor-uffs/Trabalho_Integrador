import {
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function dataLocalAtual() {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

function formatarData(data) {
    if (!data) return "—";
    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
        new Date(`${data}T00:00:00Z`),
    );
}

function formatarValor(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(Number(valor));
}

function obterNomeCliente(contrato, pessoasFisicas, empresas) {
    const pessoa = pessoasFisicas.find(
        (cliente) => Number(cliente.id) === Number(contrato.clientePfId),
    );
    if (pessoa) return pessoa.nome;
    return (
        empresas.find(
            (cliente) => Number(cliente.id) === Number(contrato.clientePjId),
        )?.nome || "Cliente não encontrado"
    );
}

export default function ContratosTabela({
    contratos,
    pessoasFisicas,
    empresas,
    aoEditar,
    aoExcluir,
}) {
    const hoje = dataLocalAtual();

    return (
        <TableContainer className="tabela-contratos">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nº</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Vigência</TableCell>
                        <TableCell>Prazo</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Situação</TableCell>
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contratos.map((contrato) => {
                        const encerrado = contrato.dataFim < hoje;
                        return (
                            <TableRow key={contrato.id} hover>
                                <TableCell>{contrato.id}</TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>
                                        {obterNomeCliente(contrato, pessoasFisicas, empresas)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {contrato.clientePfId ? "Pessoa física" : "Pessoa jurídica"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {formatarData(contrato.dataInicio)} –{" "}
                                    {formatarData(contrato.dataFim)}
                                </TableCell>
                                <TableCell>{contrato.validade} meses</TableCell>
                                <TableCell>{formatarValor(contrato.valor)}</TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        color={encerrado ? "default" : "success"}
                                        label={encerrado ? "Encerrado" : "Em andamento"}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        aria-label={`Editar contrato ${contrato.id}`}
                                        title="Editar contrato"
                                        onClick={() => aoEditar(contrato)}
                                        size="small"
                                        color="primary"
                                    >
                                        <EditOutlinedIcon />
                                    </Button>
                                    <Button
                                        aria-label={`Excluir contrato ${contrato.id}`}
                                        title="Excluir contrato"
                                        onClick={() => aoExcluir(contrato)}
                                        size="small"
                                        color="error"
                                    >
                                        <DeleteOutlineIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
