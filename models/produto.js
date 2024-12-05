const { Sequelize, sequelize } = require("./db");


const produtos = sequelize.define("produtos", {
    idprodutos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeProduto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidadeVendido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    palavrasChaves: {
        type: Sequelize.STRING,
        allowNull: true
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imagem: {
        type: Sequelize.BLOB("medium"),
        allowNull: true
    },
}, {
    tableName: 'produtos',
    timestamps: false
})
module.exports = produtos