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
  },
  
  descricao: {
    // descricao VARCHAR NOT NULL
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  preco: {
    // preco NUMBER UNIQUE NOT NULL
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  desconto: {
    // desconto NUMBER UNIQUE NOT NULL
    type: DataTypes.FLOAT,
    allowNull: false,
    validate:{
      max: 100,
      min:0,
    }},

  dataDesconto: {
    // dataDesconto Date UNIQUE NOT NULL
    type: DataTypes.DATE,
    allowNull: false,
  },

  categoria: {
    // categoria STRING UNIQUE NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Higiene", "Brinquedos", "Conforto", "Alimentacao", "Medicamentos"]]
    },
  }
});



module.exports = Produto;
