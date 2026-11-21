import {
    Box,
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logoSistema from "../../assets/logoSistema.png";
import itensNavegacao from "./itensNavegacao.js";

export default function BarraLateral({ paginaAtiva, aoAbrirPagina, aoSair }) {
    return (
        <Box
            component="nav"
            className="barra-lateral"
            aria-label="Navegação principal"
        >
            <Box className="marca-sistema">
                <img src={logoSistema} alt="VR System" />
            </Box>
            <List className="lista-navegacao" disablePadding>
                {itensNavegacao.map(({ nome, icone: Icone }) => (
                    <ListItemButton
                        aria-current={paginaAtiva === nome ? "page" : undefined}
                        className="item-navegacao"
                        key={nome}
                        selected={paginaAtiva === nome}
                        onClick={() => aoAbrirPagina(nome)}
                    >
                        <ListItemIcon>
                            <Icone />
                        </ListItemIcon>
                        <ListItemText primary={nome} />
                    </ListItemButton>
                ))}
            </List>
            <Button
                className="botao-sair"
                onClick={aoSair}
                startIcon={<LogoutIcon />}
            >
                Sair
            </Button>
        </Box>
    );
}
