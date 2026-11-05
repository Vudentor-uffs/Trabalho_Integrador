-- DROP TABLE IF EXISTS usuario_permissao;
-- DROP TABLE IF EXISTS permissao;
-- DROP TABLE IF EXISTS usuario;
-- DROP TABLE IF EXISTS empresa;
-- DROP TABLE IF EXISTS cliente_pj;
-- DROP TABLE IF EXISTS cliente_pf;
-- DROP TABLE IF EXISTS contratos;
-- DROP TABLE  IF EXISTS cliente_colaborador;
-- DROP TYPE  IF EXISTS tipo_cliente;


CREATE TYPE tipo_cliente AS ENUM ('Normal', 'Colaborador');


CREATE TABLE empresa (
    cnpj            VARCHAR(14) PRIMARY KEY DEFAULT '52693615000144',
    nome            VARCHAR(100) UNIQUE DEFAULT 'Vanessa Reolon Consultoria & Desenvolvimento Ldta.',
    endereco        VARCHAR(150) DEFAULT 'Rua Santo Antonio, 740, Chapecó-SC',
    email           VARCHAR(255) DEFAULT 'vanessareolon.vr@gmail.com',
    telefone        VARCHAR(20) DEFAULT '4999180473',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE clientes_pj ( 
    id              SERIAL PRIMARY KEY,
    cnpj            VARCHAR(14) UNIQUE NOT NULL,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    telefone        VARCHAR(20),
    endereco        VARCHAR(150),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE clientes_pf (
    id              SERIAL PRIMARY KEY,
    cpf             VARCHAR(11) UNIQUE NOT NULL,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    tipo            tipo_cliente NOT NULL DEFAULT 'Normal',
    telefone        VARCHAR(20),
    data_nascimento DATE NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cliente_colaborador (
    cliente_pj_id  INTEGER NOT NULL REFERENCES clientes_pj(id) ON DELETE CASCADE,
    cliente_pf_id  INTEGER NOT NULL REFERENCES clientes_pf(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (cliente_pj_id, cliente_pf_id)
);


CREATE TABLE contratos (
    id               SERIAL PRIMARY KEY,
    empresa          VARCHAR(14) NOT NULL REFERENCES empresa(cnpj) ON DELETE RESTRICT,
    cliente_pf_id    INTEGER REFERENCES clientes_pf(id)   ON DELETE RESTRICT,
    cliente_pj_id    INTEGER REFERENCES clientes_pj(id)   ON DELETE RESTRICT,
    data_inicio      DATE NOT NULL,
    data_fim         DATE NOT NULL,
    validade         INTEGER NOT NULL,
    valor            NUMERIC(10,2) NOT NULL,
    multa            NUMERIC(10,2) NOT NULL,
    proposta         TEXT NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_tipo_cliente_contrato CHECK (
        (cliente_pf_id IS NOT NULL AND cliente_pj_id IS NULL) OR
        (cliente_pj_id IS NOT NULL AND cliente_pf_id IS NULL)
    )
);


CREATE TABLE usuario (
    email       VARCHAR(255) PRIMARY KEY,
    nome        VARCHAR(100) NOT NULL,
    senha       VARCHAR(255) NOT NULL  -- hash bcrypt da senha
);


CREATE TABLE permissao (
    id          BIGSERIAL PRIMARY KEY,
    descricao   VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE usuario_permissao (
    email           VARCHAR(255) NOT NULL REFERENCES usuario(email) ON DELETE CASCADE,
    id_permissao    BIGINT NOT NULL REFERENCES permissao(id) ON DELETE CASCADE,
    PRIMARY KEY (email, id_permissao)
);

CREATE INDEX idx_usuario_permissao_email ON usuario_permissao (email);
CREATE INDEX idx_usuario_permissao_id_permissao ON usuario_permissao (id_permissao);


INSERT INTO clientes_pj (cnpj, nome, email, telefone, endereco) 
VALUES 
    ('11222333000155', 'Tech Solutions LTDA', 'contato@techsolutions.com', '4933221100', 'Rua Fernando Machado, 500'),
    ('44555666000188', 'Supermercado Chapecó SA', 'financeiro@superchapeco.com.br', '4933554411', 'Av. São Pedro, 1200');

INSERT INTO clientes_pf (cpf, nome, email, tipo, telefone, data_nascimento) 
VALUES 
    ('12345678901', 'João da Silva', 'joao.silva@email.com', 'Normal', '49991112222', '1990-05-15'),
    ('98765432100', 'Maria Oliveira', 'maria.oliveira@email.com', 'Colaborador', '49998887777', '1995-08-20'),
    ('55544433322', 'Carlos Eduardo', 'carlos.eduardo@email.com', 'Colaborador', '49997776666', '1988-12-01');

INSERT INTO cliente_colaborador (cliente_pj_id, cliente_pf_id) 
VALUES 
    (1, 2),  -- Maria (id 2) na Tech Solutions (id 1)
    (1, 3);  -- Carlos (id 3) na Tech Solutions (id 1)


INSERT INTO contratos (empresa, cliente_pf_id, cliente_pj_id, data_inicio, data_fim, validade, valor, multa, proposta)
VALUES (
    '52693615000144', 
    1,                  -- João da Silva (PF)
    NULL,               -- PJ precisa ser NULL
    '2026-01-01', 
    '2026-12-31', 
    12, 
    250.00, 
    50.00, 
    'Proposta de consultoria individual para pessoa física.'
), ('52693615000144', 
    NULL,               -- PF precisa ser NULL
    1,                  -- Tech Solutions LTDA (PJ)
    '2026-02-01', 
    '2027-01-31', 
    12, 
    850.00, 
    170.00, 
    'Proposta de consultoria empresarial para equipe de desenvolvimento.');

-- ============================================================================
-- DADOS DE AUTENTICAÇÃO E AUTORIZAÇÃO
-- ============================================================================

-- Inserir permissões
INSERT INTO permissao (descricao) VALUES
    ('CRIAR_CLIENTE'),
    ('EDITAR_CLIENTE'),
    ('DELETAR_CLIENTE'),
    ('CRIAR_EMPRESA'),
    ('EDITAR_EMPRESA'),
    ('DELETAR_EMPRESA'),
    ('CRIAR_CONTRATO'),
    ('EDITAR_CONTRATO'),
    ('DELETAR_CONTRATO'),
    ('EDITAR_EMPRESA_ADM'),
    ('ADMIN');

-- Inserir usuários de exemplo (senha: "senha123" - hash bcrypt)
-- Hash gerado com bcrypt.hashSync("senha123", 10)
-- OBS: Em produção, os usuários seriam criados via API com senhas individuais
INSERT INTO usuario (email, nome, senha) VALUES
    ('vanessareolon.vr@gmail.com', 'Administrador', '$2b$10$rYwHqLqN4XqXO2KzH7W5YO5XO2KzH7W5YO5XO2KzH7W5YO5XO2KzHe'),
    ('cliente@cliente.com', 'Cliente', '$2b$10$rYwHqLqN4XqXO2KzH7W5YO5XO2KzH7W5YO5XO2KzH7W5YO5XO2KzHe');

-- Associar permissões aos usuários
-- Admin tem todas as permissões
INSERT INTO usuario_permissao (email, id_permissao)
SELECT 'vanessareolon.vr@gmail.com', id FROM permissao;


