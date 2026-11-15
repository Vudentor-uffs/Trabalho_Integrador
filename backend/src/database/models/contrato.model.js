const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Contrato = sequelize.define(
    "Contrato",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        empresa: {type: DataTypes.STRING(14), allowNull: false, defaultValue: "52693615000144", field: "empresa"},
        clientePfId: {type: DataTypes.INTEGER, allowNull: true, field: "cliente_pf_id"},
        clientePjId: {type: DataTypes.INTEGER, allowNull: true, field: "cliente_pj_id"},
        valor: {type: DataTypes.DECIMAL(10,2), allowNull: false, field: "valor"},
        multa: {type: DataTypes.DECIMAL(10,2), allowNull: false, field: "multa"},
        proposta: {type: DataTypes.TEXT, allowNull: false, field: "proposta"},
        dataInicio: {type: DataTypes.DATEONLY, allowNull: false, field: "data_inicio"},
        dataFim: {type: DataTypes.DATEONLY, allowNull: false, field: "data_fim"},
        validade: { type: DataTypes.INTEGER, allowNull: false, field: "validade" }
    },
    { 
        timestamps: false, tableName: "contratos", 
        validate: {
            tipoCliente() {
                const temPf = this.clientePfId !== null && this.clientePfId !== undefined;
                const temPj = this.clientePjId !== null && this.clientePjId !== undefined;

                if ((temPf && temPj) || (!temPf && !temPj)) {
                    throw new Error(
                        "O contrato deve estar vinculado apenas a um Cliente PF ou a um Cliente PJ."
                    );
                }
            }
        }
    },
);

Contrato.associate = (models) => {
    Contrato.belongsTo(models.Empresa, {
        foreignKey: "empresa",
        targetKey: "cnpj",
        as: "empresaAdm"
    });
    Contrato.belongsTo(models.ClientePf, {
        foreignKey: "cliente_pf_id",
        as: "clientePf"
    });
    Contrato.belongsTo(models.ClientePj, {
        foreignKey: "cliente_pj_id",
        as: "clientePj"
    });
};

module.exports = Contrato;