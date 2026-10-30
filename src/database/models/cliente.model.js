const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Cliente = sequelize.define(
    "Cliente",
    {
       
    },
    { 
        
    },
);

Cliente.associate = (models) => {
    
};

module.exports = Cliente;