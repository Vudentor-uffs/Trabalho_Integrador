import { Box, Card, CardContent, Typography } from "@mui/material";

export default function GraficoSituacaoContratos({ quantidades, maximo }) {
    const situacoes = [
        { nome: "Vigentes", cor: "vigente" },
        { nome: "A iniciar", cor: "iniciar" },
        { nome: "Encerrados", cor: "encerrado" },
    ];

    return (
        <Card className="cartao-grafico-dashboard">
            <CardContent>
                <Typography component="h2" variant="h6">
                    Situação dos contratos
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    Distribuição atual por período de vigência
                </Typography>
                <Box
                    className="grafico-contratos"
                    role="img"
                    aria-label={`Contratos: ${quantidades.Vigentes} vigentes, ${quantidades["A iniciar"]} a iniciar e ${quantidades.Encerrados} encerrados`}
                >
                    {situacoes.map((situacao) => {
                        const quantidade = quantidades[situacao.nome];
                        return (
                            <Box className="linha-grafico" key={situacao.nome}>
                                <Typography className="rotulo-grafico">
                                    {situacao.nome}
                                </Typography>
                                <Box className="trilho-grafico">
                                    <Box
                                        className={`barra-grafico ${situacao.cor}`}
                                        style={{ width: `${(quantidade / maximo) * 100}%` }}
                                    />
                                </Box>
                                <Typography className="valor-grafico">
                                    {quantidade}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
}
