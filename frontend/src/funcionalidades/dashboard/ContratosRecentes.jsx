import { Box, Button, Card, CardContent, Typography } from "@mui/material";

function formatarData(data) {
    if (!data) return "—";
    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
        new Date(`${data}T00:00:00Z`),
    );
}

function nomeDoCliente(contrato, pessoasFisicas, empresas) {
    return (
        contrato.clientePf?.nome ||
        contrato.clientePj?.nome ||
        pessoasFisicas.find(
            (cliente) => Number(cliente.id) === Number(contrato.clientePfId),
        )?.nome ||
        empresas.find(
            (cliente) => Number(cliente.id) === Number(contrato.clientePjId),
        )?.nome ||
        "Cliente não identificado"
    );
}

export default function ContratosRecentes({
    contratos,
    pessoasFisicas,
    empresas,
    aoVerContratos,
}) {
    return (
        <Card className="cartao-contratos-recentes">
            <CardContent>
                <Box className="cabecalho-dashboard-card">
                    <Box>
                        <Typography component="h2" variant="h6">
                            Contratos recentes
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            Início de vigência mais recente
                        </Typography>
                    </Box>
                    <Button onClick={aoVerContratos}>Ver contratos</Button>
                </Box>
                {contratos.length ? (
                    <Box className="lista-dashboard-contratos">
                        {contratos.map((contrato) => (
                            <Box
                                className="item-dashboard-contrato"
                                key={contrato.id}
                            >
                                <Box className="dados-dashboard-contrato">
                                    <Typography fontWeight={600}>
                                        {nomeDoCliente(contrato, pessoasFisicas, empresas)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Contrato #{contrato.id}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {formatarData(contrato.dataInicio)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography className="dashboard-sem-contratos" color="text.secondary">
                        Nenhum contrato cadastrado.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
