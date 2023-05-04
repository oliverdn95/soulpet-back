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
    include: [Cliente, Produto] // trás junto os dados de produto // trás junto os dados do cliente 
  });
  res.json(pedido);
});

// Esta rota deve mostrar os dados do pedido de acordo com o "id do produto" fornecido. 
// O pedido retornado deve incluir os valores do cliente relacionado.
router.get('/pedidos/produtos/:id', async (req, res) => {
  const pedido = await Pedido.findAll({
    where: { produtoId: req.params.id },
    include: [Cliente, Produto]
  });
  res.json(pedido);
});

// Esta rota deve mostrar os dados do pedido de acordo com o id do cliente fornecido. 
// O pedido retornado deve incluir os valores do produto relacionado.
router.get('/pedidos/clientes/:id', async (req, res) => {
  const pedido = await Pedido.findAll({
    where: { clienteId: req.params.id },
    include: [Cliente, Produto]
  });
  res.json(pedido);
});

// [BE-20] Criar recurso POST para inserção de Pedidos #20
router.post("/pedidos", async (req, res) => {
  // Coletar os dados do req.body
  const { quantidade, clienteId, idProdutos } = req.body;
  // Array de Quantidade de produtos, id do cliente, array de id de produtos

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
    if (idProduto.length > 0 && demanda.length > 0 && idProduto.length === demanda.length) {

      // Tenta encontrar os produtos pelo id e se ele existir adiciona um true pro produto existente
      idProduto.forEach(async (e) => {
        const produto = await Produto.findByPk(e);
        if (produto) {
          produtoExiste.push(true);
        } else {
          produtoExiste.push(false);
        }
      });
      // Verifica a demanda e adiciona true se for válida
      demanda.forEach((e) => {

        if (e > 0) {
          demandaExiste.push(true);
        } else {
          demandaExiste.push(false);
        }
      });
    } else return res.status(400).json({ message: "Requisição inválida." });

    // Tenta encontrar Cliente
    const cliente = await Cliente.findByPk(clienteId);

    // Verifica se todos existem
    if (cliente && produtoExiste.includes(true) && demandaExiste.includes(true)) {


      // Agora atualiza todos os produtos para receber o código do pedido
      for (let i = 0; i < idProduto.length; i++) {

        // Verifica se aquele produto existir e a demanda também aí cria o pedido
        if (produtoExiste[i] === true && demandaExiste[i] === true) {

          // Dentro de 'novoPedido' estará o o objeto criado
          const novoPedido = await Pedido.create(
            { quantidade: demanda[i], clienteId, produtoId: idProduto[i] },
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

// Rota PUT para atualizar um pedido
// [BE-21] Criar recurso PUT para atualização de Pedidos #21
router.put("/pedidos/:codigo", async (req, res) => {
  // obter dados do corpo da requisição
  const { quantidade, clienteId, produtoId } = req.body;
  // obter codigo do pedido pelos parametros da rota
  const { codigo } = req.params;

  // Verifica se existem e se produtos e quantidade são válidos
  const produtoExiste = [];
  const quantidadeExiste = [];

  try {

    // Verifica se há valores em todas as variáveis necessárias
    if (quantidade && clienteId && produtoId && codigo) {

      // Tenta encontrar os produtos pelo código e se ele existir 
      // adiciona um true pro produto existente e para a demanda
      const produto = await Produto.findByPk(produtoId);
      if (produto && quantidade > 0) {
        produtoExiste.push(true);
        quantidadeExiste.push(true);
      } else {
        produtoExiste.push(false);
        quantidadeExiste.push(false);
      }
    } else return res.status(400).json({ message: "Requisição inválida." });
    // Tenta encontrar Cliente
    const cliente = await Cliente.findByPk(clienteId);

    // Verifica se todos existem
    if (cliente && produtoExiste.includes(true) && quantidadeExiste.includes(true)) {

      // Verifica se aquele produto existir e a quantidade também 
      // logo depois edita o pedido
      if (produtoExiste[0] === true && quantidadeExiste[0] === true) {
        // buscar pedido pelo codigo passado
        const pedido = await Pedido.findOne({ where: { codigo } });

        if (pedido) {
          // atualizar o pedido
          await pedido.update(
            { quantidade, clienteId, produtoId },
            { include: [Cliente, Produto] }
          );
          res.status(200).json({ message: "Pedido editado." });

        } else return res.status(404).json({ message: "Pedido não encontrado." });

      }

    } else {
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado." });
      } else if (produtoExiste.includes(false)) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//[BE-22] Criar recurso DELETE para remoção de Pedidos#22

// Remova o pedido com o respectivo id.
router.delete("/pedidos/:codigo", async (req, res) => {
  const { codigo } = req.params;
  const pedido = await Pedido.findByPk(codigo);

  try {
    if (pedido) {
      await pedido.destroy();
      res.json({ message: "O pedido foi removido." });
    } else {
      res.status(404).json({ message: "O pedido não foi encontrado" });
    }
  } catch (err) {
    console.log(err);
    next(err)
  }
});

//Remova todos os pedidos pelo respectivo id do cliente.
router.delete("/pedidos/clientes/:id", async (req, res) => {
  const pedidos = await Pedido.findAll({ where: { clienteId: req.params.id } });

  try {
    if (pedidos) {
      for (const pedido of pedidos) {
        pedido.destroy()
      }

      res.json({ message: "Os pedidos foram removidos." });
    } else {
      res.status(404).json({ message: "Os pedidos não foram encontrados" });
    }
  } catch (err) {
    console.log(err);
    next(err)
  }
});

//Remova todos os pedidos pelo respectivo id do cliente 

router.delete("/pedidos/produtos/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const pedidoPorProduto = await Pedido.findAll({
            include: [
                {
                    model: Produto,
                    where: { id: id },
                },
                {
                    model: Cliente,
                },
            ],
        });
        if (pedidoPorProduto) {
            await Pedido.destroy({ where: { produtoId: req.params.id } });
            res.json({ message: "Pedido removido!" });
        } else {
            res.status(404).json({message: "O pedido por ID do produto não foi encontrado"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});


// Remova todos os pedidos pelo respectivo id do produto.

  router.delete('/pedidos/produtos/:id', async (req, res) => {
    const id = req.params.id;
    const produto = await Produto.findByPk(id);
  
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado"});
    }
  
    try {
      await Pedido.destroy({ where: { ProdutoId: id } });
  
      res.json({ message: `Pedidos do produto ${id} foram removidos com sucesso!`});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Um erro aconteceu."});
    }
  });

module.exports = router;

