const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Contrato = sequelize.define(
    "Contrato",
    {
       
    },
    { 
        
    },
);

Contrato.associate = (models) => {
    
};

module.exports = Contrato;