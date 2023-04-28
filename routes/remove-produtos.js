const express = require("express");
const router = express.Router();
const Produto = require("../database/produto"); // modelo de dados do produto

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
