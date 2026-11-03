const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Empresa = sequelize.define(
    "Empresa",
    {
       
    },
    { 
        
    },
);

Empresa.associate = (models) => {
    
};

module.exports = Empresa;