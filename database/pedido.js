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
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  quantidade: {
    // quantidade INTEGER UNIQUE NOT NULL
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

// Relacionamento 1:N (Um cliente pode ter N pedidos)
Cliente.hasMany(Pedido, { foreignKey: "clienteId" });
// Um pedido pertece a um cliente
Pedido.belongsTo(Cliente);

// Relacionamento 1:N (Um pedido pode ter N produtos)
Produto.hasMany(Pedido, { foreignKey: "produtoId" }); 
Pedido.belongsTo(Produto, { foreignKey: "produtoId" });


module.exports = Pedido;
