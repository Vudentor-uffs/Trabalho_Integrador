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

export async function carregarClientes() {
    const [respostaPessoaFisica, respostaPessoaJuridica] = await Promise.all([
        axios.get(`${enderecoApi}/clientes_pf`, {
            headers: cabecalhosAutenticados(),
        }),
        axios.get(`${enderecoApi}/clientes_pj`, {
            headers: cabecalhosAutenticados(),
        }),
    ]);

    return {
        pessoasFisicas: respostaPessoaFisica.data,
        pessoasJuridicas: respostaPessoaJuridica.data,
    };
}

async function executarAlteracao(requisicao, mensagemPadrao) {
    try {
        const resposta = await requisicao;
        return resposta.data;
    } catch (erro) {
        throw new Error(mensagemDoErro(erro, mensagemPadrao), { cause: erro });
    }
}

export function criarPessoaFisica(dados) {
    return executarAlteracao(
        axios.post(`${enderecoApi}/clientes_pf`, dados, {
            headers: cabecalhosAutenticados(),
        }),
        "Não foi possível cadastrar a pessoa física.",
    );
}

export function atualizarPessoaFisica(id, dados) {
    return executarAlteracao(
        axios.put(`${enderecoApi}/clientes_pf/${id}`, dados, {
            headers: cabecalhosAutenticados(),
        }),
        "Não foi possível atualizar a pessoa física.",
    );
}

export async function excluirPessoaFisica(id) {
    await executarAlteracao(
        axios.delete(`${enderecoApi}/clientes_pf/${id}`, {
            headers: cabecalhosAutenticados(),
        }),
        "Não foi possível excluir a pessoa física.",
    );
}

export function criarPessoaJuridica(dados) {
    return executarAlteracao(
        axios.post(`${enderecoApi}/clientes_pj`, dados, {
            headers: cabecalhosAutenticados(),
        }),
        "Não foi possível cadastrar a pessoa jurídica.",
    );
}

export function atualizarPessoaJuridica(id, dados) {
    return executarAlteracao(
        axios.put(`${enderecoApi}/clientes_pj/${id}`, dados, {
            headers: cabecalhosAutenticados(),
        }),
        "Não foi possível atualizar a pessoa jurídica.",
    );
}

export async function excluirPessoaJuridica(id) {
    await executarAlteracao(
        axios.delete(`${enderecoApi}/clientes_pj/${id}`, {
            headers: cabecalhosAutenticados(),
        }),
        "Não foi possível excluir a pessoa jurídica.",
    );
}
