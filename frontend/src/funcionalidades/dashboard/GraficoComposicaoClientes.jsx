import { Box, Card, CardContent, Typography } from "@mui/material";

export default function GraficoComposicaoClientes({
    pessoasFisicas,
    empresas,
    total,
    percentualPessoasFisicas,
}) {
    return (
        <Card className="cartao-grafico-dashboard">
            <CardContent>
                <Typography component="h2" variant="h6">
                    Composição dos clientes
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    Pessoas físicas e empresas cadastradas
                </Typography>
                <Box className="grafico-clientes">
                    <Box
                        className="grafico-rosca-clientes"
                        role="img"
                        aria-label={`Composição dos clientes: ${pessoasFisicas} pessoas físicas e ${empresas} empresas`}
                        style={{
                            background:
                                total > 0
                                    ? `conic-gradient(#009da5 0 ${percentualPessoasFisicas}%, #d99727 ${percentualPessoasFisicas}% 100%)`
                                    : "#e4e7e9",
                        }}
                    >
                        <Box className="centro-grafico-clientes">
                            <Typography className="total-grafico-clientes">
                                {total}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                                clientes
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="legenda-grafico-clientes">
                        <Box className="item-legenda-clientes">
                            <Box className="ponto-legenda pessoa-fisica" />
                            <Typography>Pessoas físicas</Typography>
                            <Typography fontWeight={700}>{pessoasFisicas}</Typography>
                        </Box>
                        <Box className="item-legenda-clientes">
                            <Box className="ponto-legenda pessoa-juridica" />
                            <Typography>Empresas</Typography>
                            <Typography fontWeight={700}>{empresas}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
