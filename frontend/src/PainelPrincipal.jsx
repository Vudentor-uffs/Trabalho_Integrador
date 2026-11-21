import { useState } from "react";
import { Box } from "@mui/material";
import BarraLateral from "./componentes/navegacao/BarraLateral.jsx";
import CabecalhoPainel from "./componentes/navegacao/CabecalhoPainel.jsx";
import PaginaClientes from "./paginas/PaginaClientes.jsx";
import PaginaContratos from "./paginas/PaginaContratos.jsx";
import PaginaInicial from "./paginas/PaginaInicial.jsx";
import "./Painel.css";

const descricoesPaginas = {
    Dashboard: "Acompanhe os principais números de clientes e contratos.",
    Clientes: "Cadastre e consulte pessoas físicas e empresas.",
    Contratos: "Gerencie os contratos e seus períodos de vigência.",
};

export default function PainelPrincipal({ emailUsuario, aoSair }) {
    const [paginaAtiva, setPaginaAtiva] = useState("Dashboard");

    return (
        <Box className="area-trabalho">
            <BarraLateral
                paginaAtiva={paginaAtiva}
                aoAbrirPagina={setPaginaAtiva}
                aoSair={aoSair}
            />
            <Box component="main" className="conteudo-principal">
                <CabecalhoPainel
                    emailUsuario={emailUsuario}
                    aoSair={aoSair}
                    titulo={paginaAtiva}
                    descricao={descricoesPaginas[paginaAtiva]}
                />
                {paginaAtiva === "Dashboard" && (
                    <PaginaInicial aoAbrirPagina={setPaginaAtiva} />
                )}
                {paginaAtiva === "Clientes" && <PaginaClientes />}
                {paginaAtiva === "Contratos" && <PaginaContratos />}
            </Box>
        </Box>
    );
}
