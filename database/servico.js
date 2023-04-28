const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Servico = connection.define("servico", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
    require: true
  }
});

module.exports = Servico;
