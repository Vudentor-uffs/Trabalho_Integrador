const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ClientePj = sequelize.define(
    "ClientePj",
    {
       
    },
    { 
        
    },
);

ClientePj.associate = (models) => {
    
};

module.exports = ClientePj;