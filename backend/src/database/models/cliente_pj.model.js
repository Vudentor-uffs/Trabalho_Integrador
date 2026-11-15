const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ClientePj = sequelize.define(
    "ClientePj",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        cnpj: {type: DataTypes.STRING(14), unique: true, allowNull: false, field: "cnpj"},
        nome: {type: DataTypes.STRING(100), allowNull: false, field: "nome"},
        email: {type: DataTypes.STRING(255), allowNull: false, field: "email"},
        telefone: {type: DataTypes.STRING(20), field: "telefone"},
        endereco: {type: DataTypes.STRING(150), field: "endereco"},
    },
    { 
        timestamps: false, tableName: "clientes_pj" 
    },
);

ClientePj.associate = (models) => {
    ClientePj.hasMany(models.ClientePf, {
        foreignKey: "cliente_pj_id",
        as: "colaboradores"
    });
    ClientePj.hasMany(models.Contrato, {
        foreignKey: "cliente_pj_id",
        as: "contratos"
    });
};

module.exports = ClientePj;