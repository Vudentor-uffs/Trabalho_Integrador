# Trabalho integrador
## VR System — Sistema de Gestão de Clientes e Contratos

O seguinte projeto apresenta um Sistema Web desenvolvido para a disciplina de Desenvolvimento de Sistemas Web, integrando conceitos de Banco de Dados e Engenharia de Software.

O sistema foi implementado para uso exclusivo da **Empresa Vanessa Reolon Consultoria & Desenvolvimento Ldta**. e permite o gerenciamento completo (CRUD) de clientes Pessoa Física, clientes Pessoa Jurídica (Empresas) e Contratos de consultoria, além de contar com controle de acesso baseado em perfis/permissões (JWT) e um Dashboard analítico dinâmico. O uso por usuários externos são limitados para apenas consultoria de informações sobre a empresa.

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:
* Node.js (versão 18 ou superior)
* PostgreSQL (versão 14 ou superior) e pgAdmin 4 (opcional)
* Git

## Instruções de execução

1. Clonar o repositório:

```bash
git clone https://github.com/Vudentor-uffs/Trabalho_Integrador.git
cd Trabalho_Integrador
```

2. Configurar o Banco de Dados:
* No PostgreSQL (utilizando o usuário `postgres` e senha `postgres` na porta `5432`), crie um banco de dados chamado **`trabIntegrador`** (caso use outra senha no PostgreSQL, ajuste a string de conexão no arquivo `backend/src/database/connection.js`).
* Execute o script `.sql` localizado dentro da pasta `backend/` (via pgAdmin 4 ou pelo terminal com `psql -U postgres -d trabIntegrador -f backend/nome_do_arquivo.sql`) para criar as tabelas e inserir os usuários iniciais.

3. Configurar e iniciar o back-end:  

```bash
cd backend
yarn install # ou npm install
yarn dev # ou npm dev
```

4. Configurar e iniciar o front-end: 

```bash
cd frontend
yarn install # ou npm install
yarn dev # ou npm dev
```
* Acesse no navegador o endereço exibido no terminal.

Cerifique-se de executar os passos 3 e 4 simultaneamente em treminais separados.

## Instruções de uso

1. **Acesso como adiministrador:** para o uso do VR-System, com visualização do Dasboard, acesso dos dados registrados e operações de CRUD, faça o login com:
```json
  "username": "vanessareolon.vr@gmail.com",
  "password": "senha123"
```

2. **Acesso como cliente:** para a visualização de informações da Empresa Vanessa Reolon Consultoria & Desenvolvimento Ldta., faça o login com:

```json
  "username": "cliente.vr@cliente.com",
  "password": "senha123"
```
ou faça uma requisição `POST /novoUsuario` para cadastrar um novo usuário.

* Login feito com sucesso, lembre-se de inclur o token gerado no cabeçalho das requisições feitas diretamente ao backend.

## Autores

* Brenda Vivan Pastre (brenda.pastre@estudante.uffs.edu.br)

* Vittor Hugo Reolon (vittor.reolon@estudante.uffs.edu.br)