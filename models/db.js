const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("veterinaria", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("conectado ao banco de dados.");
}).catch((er) => {
    console.log(`houve um erro: ${er}.`);
})

module.exports = { Sequelize, sequelize }