const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const EmpresaAdm = sequelize.define(
    "EmpresaAdm",
    {
       
    },
    { 
        
    },
);

EmpresaAdm.associate = (models) => {
    
};

module.exports = EmpresaAdm;