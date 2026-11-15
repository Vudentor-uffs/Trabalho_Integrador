const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Empresa = sequelize.define(
    "Empresa",
    {
        cnpj: {type: DataTypes.STRING(14), primaryKey: true, allowNull: false, defaultValue: "52693615000144", field: "cnpj"},
        nome: {type: DataTypes.STRING(100), unique: true, allowNull: false, defaultValue:"Vanessa Reolon Consultoria & Desenvolvimento Ldta.", field: "nome"},
        endereco: {type: DataTypes.STRING(150), defaultValue:"Rua Santo Antonio, 740, Chapecó-SC", field: "endereco"},
        email: {type: DataTypes.STRING(255), allowNull: false, defaultValue:"vanessareolon.vr@gmail.com", field: "email"},
        telefone: {type: DataTypes.STRING(20), defaultValue:"4999180473", field: "telefone"},
        
    },
    { 
        timestamps: true, tableName: "empresa" 
    },
);

Empresa.associate = (models) => {
    Empresa.hasMany(models.Contrato, {
        foreignKey: "empresa",
        sourceKey: "cnpj",    
        as: "contratos"
    });
};

module.exports = Empresa;