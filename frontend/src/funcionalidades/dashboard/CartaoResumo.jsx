import { Box, Card, CardContent, Typography } from "@mui/material";

export default function CartaoResumo({ icone: Icone, titulo, valor, descricao }) {
    return (
        <Card className="cartao-resumo-dashboard">
            <CardContent>
                <Box className="resumo-cabecalho-dashboard">
                    <Typography color="text.secondary">{titulo}</Typography>
                    <Icone color="primary" />
                </Box>
                <Typography component="p" className="resumo-valor-dashboard">
                    {valor}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    {descricao}
                </Typography>
            </CardContent>
        </Card>
    );
}
