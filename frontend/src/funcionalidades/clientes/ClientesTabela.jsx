import {
    Button,
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

function formatarDocumento(documento, quantidade) {
    const numero = String(documento || "");
    if (numero.length !== quantidade) return numero || "—";
    return quantidade === 11
        ? numero.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        : numero.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export default function ClientesTabela({
    clientes,
    pessoasJuridicas,
    pessoaFisica,
    aoEditar,
    aoExcluir,
}) {
    return (
        <TableContainer className="tabela-clientes">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>{pessoaFisica ? "CPF" : "CNPJ"}</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>{pessoaFisica ? "Tipo / Empresa" : "Endereço"}</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((cliente) => {
                        const empresa = pessoasJuridicas.find(
                            (item) => item.id === cliente.clientePjId,
                        );
                        const tipoOuEndereco = pessoaFisica
                            ? cliente.tipo === "Colaborador"
                                ? `Colaborador${empresa ? ` — ${empresa.nome}` : ""}`
                                : "Normal"
                            : cliente.endereco || "—";

                        return (
                            <TableRow key={cliente.id} hover>
                                <TableCell>
                                    <Typography fontWeight={600}>{cliente.nome}</Typography>
                                </TableCell>
                                <TableCell>
                                    {formatarDocumento(
                                        pessoaFisica ? cliente.cpf : cliente.cnpj,
                                        pessoaFisica ? 11 : 14,
                                    )}
                                </TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{tipoOuEndereco}</TableCell>
                                <TableCell>{cliente.telefone || "—"}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        aria-label={`Editar ${cliente.nome}`}
                                        title="Editar cliente"
                                        onClick={() => aoEditar(cliente)}
                                        size="small"
                                    >
                                        <EditOutlinedIcon />
                                    </Button>
                                    <Button
                                        aria-label={`Excluir ${cliente.nome}`}
                                        title="Excluir cliente"
                                        onClick={() => aoExcluir(cliente)}
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
