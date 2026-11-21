import { Avatar, Box, Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function CabecalhoPainel({
    emailUsuario,
    aoSair,
    titulo,
    descricao,
}) {
    const nome = String(emailUsuario || "")
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\p{L}/gu, (letra) => letra.toLocaleUpperCase("pt-BR"));
    const iniciais = nome
        .split(" ")
        .slice(0, 1)
        .map((parte) => parte.charAt(0))
        .join("")
        .toUpperCase();

    return (
        <Box component="header" className="cabecalho-painel">
            <Box>
                <Typography component="h1" variant="h4" className="titulo-pagina">
                    {titulo}
                </Typography>
                <Typography color="text.secondary">{descricao}</Typography>
            </Box>
            <Box className="usuario-painel">
                <Avatar aria-label={`Usuário ${nome || emailUsuario}`}>
                    {iniciais || "U"}
                </Avatar>
                <Typography className="nome-usuario">
                    {nome || emailUsuario}
                </Typography>
                <Button
                    className="botao-sair-cabecalho"
                    onClick={aoSair}
                    size="small"
                    startIcon={<LogoutIcon />}
                >
                    Sair
                </Button>
            </Box>
        </Box>
    );
}
