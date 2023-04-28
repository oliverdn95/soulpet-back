// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Produto = connection.define("produto", {
  // Configurar a coluna 'nome'
  nome: {
    // nome VARCHAR NOT NULL
    type: DataTypes.STRING,
    allowNull: false, // NOT NULL
    require: true,
  },
  
  descricao: {
    // descricao VARCHAR NOT NULL
    type: DataTypes.STRING(150),
    allowNull: false,
    require: true,
  },

  preco: {
    // preco NUMBER UNIQUE NOT NULL
    type: DataTypes.FLOAT,
    allowNull: false,
    require: true,
  },

  desconto: {
    // desconto NUMBER UNIQUE NOT NULL
    type: DataTypes.FLOAT,
    allowNull: false,
    require: true,
    validate:{
      max: 100,
      min:0,
    }},

  dataDesconto: {
    // dataDesconto Date UNIQUE NOT NULL
    type: DataTypes.DATE,
    allowNull: false,
    require: true,
  },

  categoria: {
    // categoria STRING UNIQUE NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
    values: ["Higiene", "Brinquedos", "Conforto", "Alimentação", "Medicamentos"],
    require: true,
  }
});



module.exports = Produto;
