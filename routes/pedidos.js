const Pedido = require("../database/pedido");
const Endereco = require("../database/endereco");
const Pet = require("../database/pet");

const { Router } = require("express");
const Produto = require("../database/produto");
const Cliente = require("../database/cliente");

// Criar o grupo de rotas (/pedidos)
const router = Router();

// Definição de rotas
// [BE-19] Criar recurso GET para listagem de Pedidos #19
router.get("/pedidos", async (req, res) => {
  // SELECT * FROM pedidos;
  const listaPedidos = await Pedido.findAll({ include: [Cliente, Produto] });
  res.json(listaPedidos);
});

router.get("/pedidos/:codigo", async (req, res) => {
    // SELECT * FROM pedidos WHERE id = :id;
    const pedido = await Pedido.findOne({
      where: { codigo: req.params.codigo },
      include: [Cliente, Produto ] // trás junto os dados de produto // trás junto os dados do cliente 
    });
    res.json(pedido);
});

// Esta rota deve mostrar os dados do pedido de acordo com o "id do produto" fornecido. 
// O pedido retornado deve incluir os valores do cliente relacionado.
router.get('/pedidos/produtos/:id', async (req, res) => {
    const pedido = await Pedido.findAll({ 
        where: { produtoId: req.params.id },
        include: [ Cliente, Produto ]
    });
    res.json(pedido);
  });

// Esta rota deve mostrar os dados do pedido de acordo com o id do cliente fornecido. 
// O pedido retornado deve incluir os valores do produto relacionado.
router.get('/pedidos/clientes/:id', async (req, res) => {
  const pedido = await Pedido.findAll({ 
      where: { clienteId: req.params.id },
      include: [ Cliente, Produto ]
  });
  res.json(pedido);
});

// [BE-20] Criar recurso POST para inserção de Pedidos #20
  router.post("/pedidos", async (req, res) => {
    // Coletar os dados do req.body
    const { quantidade, clienteId, idProdutos } = req.body;
    // Quantidade de produtos, id do cliente, array de id de produtos

    // Transformando o id produtos e a quantidade de demanda em array caso ele não seja
    // Criando o array de pedidos
    const idProduto = [];
    const demanda = [];
    const pedidos = [];

    // Verifica se existem e se produtos e demandas são válidos
    const produtoExiste = [];
    const demandaExiste = [];

    try {

      // Passa todos os valores de id dentro desse novo array
      idProdutos.forEach(e => {
        idProduto.push(e);
      });
      quantidade.forEach(e => {
        demanda.push(e);
      });

      // Verifica se há algo dentro do array
      if( idProduto.length > 0 && demanda.length > 0 && idProduto.length === demanda.length ){

        // Tenta encontrar os produtos pelo id e se ele existir adiciona um true pro produto existente
        idProduto.forEach(async (e) => {
          const produto = await Produto.findByPk(e);
          if(produto){
            produtoExiste.push(true);
          } else {
            produtoExiste.push(false);
          }
        });
        // Verifica a demanda e adiciona true se for válida
        demanda.forEach((e) => {
          
          if( e > 0 ){
            demandaExiste.push(true);
          } else {
            demandaExiste.push(false);
          }
        });
      } else return res.status(400).json({ message: "Requisição inválida." });

      // Tenta encontrar Cliente
      const cliente = await Cliente.findByPk(clienteId);

      // Verifica se todos existem
      if (cliente && produtoExiste.includes(true) && demandaExiste.includes(true) ){

        
        // Agora atualiza todos os produtos para receber o código do pedido
        for (let i = 0; i < idProduto.length; i++) {

          // Verifica se aquele produto existir e a demanda também aí cria o pedido
          if( produtoExiste[i] === true && demandaExiste[i] === true ){

            // Dentro de 'novoPedido' estará o o objeto criado
            const novoPedido = await Pedido.create(
              { quantidade: demanda[i] , clienteId, produtoId: idProduto[i] },
              { include: [Cliente, Produto] }
            );
            
            pedidos.push(novoPedido);
          }
        }

        // Mostra o resultado
        res.status(201).json(pedidos);
      } else return res.status(404).json({ message: "Cliente ou Produto inválida." });
      
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

module.exports = router;
