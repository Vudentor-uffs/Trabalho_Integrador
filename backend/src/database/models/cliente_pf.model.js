const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const ClientePf = sequelize.define(
    "ClientePf",
    {
       
    },
    { 
        
    },
);

ClientePf.associate = (models) => {
    
};

module.exports = ClientePf;