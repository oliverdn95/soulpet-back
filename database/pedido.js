// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");
const Produto = require("./produto");

const Pedido = connection.define("pedido", {
  // Configurar a coluna 'nome'
  codigo: {
    // codigo NOT NULL
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
  },

  quantidade: {
    // quantidade NUMBER UNIQUE NOT NULL
    type: DataTypes.NUMBER,
    allowNull: false,
    require: true,
  },
});

// Relacionamento 1:N (Um cliente pode ter N pedidos)
Cliente.hasMany(Pedido,{ foreignKey: "codigo"});
// Um pedido pertece a um cliente
Pedido.belongsTo(Cliente);

// Relacionamento 1:N (Um pedido pode ter N produtos)
Pedido.hasMany(Produto); //TODO {type: Produto.UUID}
// Um produto pertece a um pedido
Produto.belongsTo(Pedido);


module.exports = Pedido;
