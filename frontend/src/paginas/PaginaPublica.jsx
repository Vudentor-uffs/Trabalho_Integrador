import { useEffect, useState } from "react";
import {
    ArrowBackIosNew,
    ArrowForwardIos,
    AssignmentIndOutlined,
    BusinessCenterOutlined,
    EmailOutlined,
    GroupsOutlined,
    InsightsOutlined,
    PhoneOutlined,
    WhatsApp,
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import fotoConsultoria from "../assets/Imagem_1.jpeg";
import fotoPalestra from "../assets/Imagem_2.jpeg";
import fotoMentoria from "../assets/Imagem_3.jpeg";
import fotoDesenvolvimento from "../assets/Imagem_4.jpeg";
import fotoEvento from "../assets/Imagem_5.jpeg";
import logoEmpresa from "../assets/Logo_VR.png";
import "./PaginaPublica.css";

const destaques = [
    {
        titulo: "Desenvolvimento que conecta pessoas, fortalece a gestão e impulsiona resultados.",
        descricao:
            "A Vanessa Reolon Consultoria & Desenvolvimento atua no desenvolvimento organizacional e humano, preparando pessoas e organizações para evoluir.",
        imagem: fotoEvento,
        textoAlternativo: "Vanessa Reolon compartilhando conhecimento em um evento",
    },
    {
        titulo: "Lideranças conscientes. Equipes mais fortes.",
        descricao:
            "Desenvolvemos lideranças e fortalecemos a gestão para potencializar as relações e a alta performance das equipes.",
        imagem: fotoPalestra,
        textoAlternativo: "Vanessa Reolon ministrando uma palestra",
    },
    {
        titulo: "Desenvolvimento que respeita cada trajetória.",
        descricao:
            "Também apoiamos pessoas e profissionais em seu crescimento e em suas trajetórias individuais.",
        imagem: fotoMentoria,
        textoAlternativo: "Vanessa Reolon falando ao microfone",
    },
    {
        titulo: "Gestão estratégica para impulsionar resultados.",
        descricao:
            "Consultorias empresariais para fortalecer a gestão e alinhar o desenvolvimento das pessoas aos objetivos da organização.",
        imagem: fotoDesenvolvimento,
        textoAlternativo: "Vanessa Reolon em uma conversa sobre desenvolvimento",
    },
    {
        titulo: "Pessoas preparadas transformam organizações.",
        descricao:
            "Palestras, mentorias e Planos de Desenvolvimento Individual para aprimorar competências e fortalecer relações.",
        imagem: fotoConsultoria,
        textoAlternativo: "Vanessa Reolon em um momento de consultoria",
    },
];

const servicos = [
    {
        titulo: "Consultoria empresarial",
        descricao:
            "Gestão estratégica e fortalecimento da gestão, com foco nos desafios e objetivos de cada organização.",
        icone: <BusinessCenterOutlined />,
    },
    {
        titulo: "Lideranças e equipes",
        descricao:
            "Desenvolvimento de lideranças e fortalecimento das relações para potencializar a alta performance das equipes.",
        icone: <GroupsOutlined />,
    },
    {
        titulo: "Palestras e mentorias",
        descricao:
            "Experiências de aprendizagem para aprimorar competências e apoiar o desenvolvimento de pessoas.",
        icone: <InsightsOutlined />,
    },
    {
        titulo: "Plano de Desenvolvimento Individual",
        descricao:
            "Planos de Desenvolvimento Individual (PDI) para apoiar o crescimento profissional e a evolução de competências.",
        icone: <AssignmentIndOutlined />,
    },
];

export default function PaginaPublica({ emailUsuario, nomeUsuario, aoAbrirLogin, aoSair }) {
    const [destaqueAtual, setDestaqueAtual] = useState(0);
    const destaque = destaques[destaqueAtual];

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return undefined;
        }
        const intervalo = window.setInterval(() => {
            setDestaqueAtual((atual) => (atual + 1) % destaques.length);
        }, 6000);
        return () => window.clearInterval(intervalo);
    }, []);

    function irParaDestaque(direcao) {
        setDestaqueAtual((atual) => (
            atual + direcao + destaques.length
        ) % destaques.length);
    }

    return (
        <div className="pagina-publica">
            <header className="cabecalho-publico">
                <a className="marca-publica" href="#inicio" aria-label="Início">
                    <img src={logoEmpresa} alt="Logo Vanessa Reolon" />
                    <span>Vanessa Reolon Consultoria &amp; Desenvolvimento</span>
                </a>
                <nav className="navegacao-publica" aria-label="Navegação principal">
                    <a href="#inicio">Início</a>
                    <a href="#servicos">O que fazemos</a>
                    <a href="#contato">Contato</a>
                </nav>
                {emailUsuario ? (
                    <div className="acoes-usuario-publico">
                        <Typography className="boas-vindas-publico">
                            Olá, {nomeUsuario || "Cliente"}
                        </Typography>
                        <Button variant="outlined" onClick={aoSair}>
                            Sair
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="botao-login-publico"
                        variant="outlined"
                        onClick={aoAbrirLogin}
                    >
                        Login
                    </Button>
                )}
            </header>

            <main>
                <section className="destaque-publico" id="inicio" aria-roledescription="carrossel">
                    <div className="conteudo-destaque-publico" aria-live="polite">
                        <Typography className="etiqueta-publica">
                            CONSULTORIA &amp; DESENVOLVIMENTO
                        </Typography>
                        <Typography component="h1" className="titulo-destaque-publico">
                            {destaque.titulo}
                        </Typography>
                        <Typography className="descricao-destaque-publico">
                            {destaque.descricao}
                        </Typography>
                        <Button
                            className="botao-contato-destaque"
                            component="a"
                            href="#contato"
                            variant="contained"
                        >
                            Fale com a gente
                        </Button>
                    </div>
                    <div className="imagem-destaque-publico">
                        <img
                            className="fundo-imagem-destaque"
                            src={destaque.imagem}
                            alt=""
                            aria-hidden="true"
                        />
                        <img
                            className="foto-destaque-publico"
                            src={destaque.imagem}
                            alt={destaque.textoAlternativo}
                        />
                        <div className="controles-carrossel">
                            <IconButton
                                aria-label="Destaque anterior"
                                onClick={() => irParaDestaque(-1)}
                            >
                                <ArrowBackIosNew />
                            </IconButton>
                            <div className="pontos-carrossel" aria-label="Selecionar destaque">
                                {destaques.map((item, indice) => (
                                    <button
                                        key={item.titulo}
                                        type="button"
                                        className={indice === destaqueAtual ? "ponto-carrossel ativo" : "ponto-carrossel"}
                                        aria-label={`Mostrar destaque ${indice + 1}`}
                                        aria-current={indice === destaqueAtual ? "true" : undefined}
                                        onClick={() => setDestaqueAtual(indice)}
                                    />
                                ))}
                            </div>
                            <IconButton
                                aria-label="Próximo destaque"
                                onClick={() => irParaDestaque(1)}
                            >
                                <ArrowForwardIos />
                            </IconButton>
                        </div>
                    </div>
                </section>

                <section className="secao-servicos-publica" id="servicos">
                    <div className="titulo-secao-publica">
                        <Typography className="etiqueta-publica">COMO PODEMOS AJUDAR</Typography>
                        <Typography component="h2">Soluções pensadas para você</Typography>
                        <Typography>
                            Aprimoramos competências, fortalecemos relações e desenvolvemos pessoas e organizações.
                        </Typography>
                    </div>
                    <div className="cartoes-servicos-publicos">
                        {servicos.map((servico) => (
                            <article className="cartao-servico-publico" key={servico.titulo}>
                                <Avatar className="icone-servico-publico">{servico.icone}</Avatar>
                                <Typography component="h3">{servico.titulo}</Typography>
                                <Typography>{servico.descricao}</Typography>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="secao-contato-publica" id="contato">
                    <div>
                        <Typography className="etiqueta-publica">VAMOS CONVERSAR?</Typography>
                        <Typography component="h2">Conte um pouco sobre o seu projeto.</Typography>
                        <Typography>
                            Entre em contato pelo canal que preferir. Será um prazer conversar com você.
                        </Typography>
                    </div>
                    <div className="opcoes-contato-publicas">
                        <Button
                            component="a"
                            href="https://wa.me/554999180473"
                            target="_blank"
                            rel="noreferrer"
                            startIcon={<WhatsApp />}
                            variant="contained"
                        >
                            WhatsApp
                        </Button>
                        <Button
                            component="a"
                            href="mailto:vanessareolon.vr@gmail.com"
                            startIcon={<EmailOutlined />}
                            variant="outlined"
                        >
                            E-mail
                        </Button>
                        <Button
                            component="a"
                            href="tel:+554999180473"
                            startIcon={<PhoneOutlined />}
                            variant="text"
                        >
                            (49) 9918-0473
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="rodape-publico">
                <span>VANESSA REOLON CONSULTORIA &amp; DESENVOLVIMENTO LTDA.</span>
                <span>Chapecó — SC</span>
            </footer>
        </div>
    );
}
