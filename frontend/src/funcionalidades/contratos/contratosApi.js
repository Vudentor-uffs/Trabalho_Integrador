import axios from "axios";

const enderecoApi = "http://localhost:3000";

function cabecalhosAutenticados() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Sua sessão expirou. Entre novamente para continuar.");
    }

    return { Authorization: `Bearer ${token}` };
}

function mensagemDoErro(erro, mensagemPadrao) {
    return erro.response?.data?.erro || erro.response?.data?.message || mensagemPadrao;
}

export async function carregarDadosContratos() {
    const [respostaContratos, respostaPessoaFisica, respostaPessoaJuridica] =
        await Promise.all([
            axios.get(`${enderecoApi}/contratos`),
            axios.get(`${enderecoApi}/clientes_pf`),
            axios.get(`${enderecoApi}/clientes_pj`),
        ]);

    return {
        contratos: respostaContratos.data,
        clientesPessoaFisica: respostaPessoaFisica.data,
        clientesPessoaJuridica: respostaPessoaJuridica.data,
    };
}

export async function criarContrato(dados) {
    try {
        const resposta = await axios.post(`${enderecoApi}/contratos`, dados, {
            headers: cabecalhosAutenticados(),
        });
        return resposta.data;
    } catch (erro) {
        throw new Error(mensagemDoErro(erro, "Não foi possível cadastrar o contrato."), {
            cause: erro,
        });
    }
}

export async function atualizarContrato(id, dados) {
    try {
        const resposta = await axios.put(`${enderecoApi}/contratos/${id}`, dados, {
            headers: cabecalhosAutenticados(),
        });
        return resposta.data;
    } catch (erro) {
        throw new Error(mensagemDoErro(erro, "Não foi possível atualizar o contrato."), {
            cause: erro,
        });
    }
}

export async function excluirContrato(id) {
    try {
        await axios.delete(`${enderecoApi}/contratos/${id}`, {
            headers: cabecalhosAutenticados(),
        });
    } catch (erro) {
        throw new Error(mensagemDoErro(erro, "Não foi possível excluir o contrato."), {
            cause: erro,
        });
    }
}
