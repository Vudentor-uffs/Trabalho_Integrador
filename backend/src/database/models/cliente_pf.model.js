const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ClientePf = sequelize.define(
    "ClientePf",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        cpf: {type: DataTypes.STRING(11), unique: true, allowNull: false, field: "cpf"},
        nome: {type: DataTypes.STRING(100), allowNull: false, field: "nome"},
        email: {type: DataTypes.STRING(255), allowNull: false, field: "email"},
        tipo: {type: DataTypes.ENUM("Normal", "Colaborador"), allowNull: false, defaultValue: "Normal", field: "tipo"},
        telefone: {type: DataTypes.STRING(20), field: "telefone"},
        dataNascimento: {type: DataTypes.DATEONLY, allowNull: false, field: "data_nascimento"},
        clientePjId: { type: DataTypes.INTEGER, field: "cliente_pj_id" }
    },
    { 
        timestamps: true, tableName: "clientes_pf" 
    },
);

ClientePf.associate = (models) => {
    ClientePf.belongsTo(models.ClientePj, {
        foreignKey: "cliente_pj_id",
        as: "empresa"
    });
    ClientePf.hasMany(models.Contrato, {
        foreignKey: "cliente_pf_id",
        as: "contratos"
    });    
};

module.exports = ClientePf;