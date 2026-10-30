const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("trabIntegrador", "postgres", "postgres", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false, 
});

module.exports = sequelize;
