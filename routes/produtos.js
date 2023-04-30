const express = require("express");
const router = express.Router();
const Produto = require("../database/produto");

//CRUD PRODUTOS

// Create
// Rota Post para inserir novos produtos

router.post("/produtos", async (req, res) => {
  const { nome, descricao, preco, desconto, dataDesconto, categoria } =
    req.body;
  // Atualizar conforme o modelo de validação da categoria de Produto
  const categorias = [
    "Higiene",
    "Brinquedos",
    "Conforto",
    "Alimentação",
    "Medicamentos",
  ];

  try {
    if (dataDesconto || desconto || categoria) {
      if (desconto < 0 || desconto > 100) {
        return res
          .status(400)
          .json({
            message: "Por favor, digite uma porcentagem de desconto válida.",
          });
      }

      if (!categorias.includes(categoria)) {
        return res.status(400).json({ message: "Categoria inválida." });
      }

      if (new Date() >= new Date(dataDesconto)) {
        return res.status(400).json({ message: "Desconto vencido." });
      }

      const novoProduto = await Produto.create({
        nome,
        descricao,
        preco,
        desconto,
        dataDesconto,
        categoria,
      });
      res.status(201).json(novoProduto);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//Read
// Rotas GET para listagem de produtos

router.get("/produtos", async (req, res) => {
  try {
    let produtos = [];
    if (req.query.nome) {
      produtos = await Produto.findAll({ where: { nome: req.query.nome } });
    } else if (req.query.categoria) {
      produtos = await Produto.findAll({
        where: { categoria: req.query.categoria },
      });
    } else {
      produtos = await Produto.findAll();
    }
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

// Mostra os dados do produto pelo id
router.get("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
});

// Update
//Rota PUT para atualizar produtos existentes.


//Delete
// Rota DELETE que remove um produto de acordo com sua ID
router.delete("/produtos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).send("Produto não encontrado!");
    }
    await produto.destroy();
    res.send("Produto removido com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao remover o produto!");
  }
});

// Rota DELETE que exclui todos os produtos
router.delete("/produtos", async (req, res) => {
    try {
      await Produto.destroy({ where: {} });
      res.send("Todos os produtos foram removidos com sucesso!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao remover todos os produtos!");
    }
  });

module.exports = router;
