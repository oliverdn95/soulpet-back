const express = require('express');
const router = express.Router();
const Produto = require('../database/produto');

// Lista todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    let produtos = [];
    if (req.query.nome) {
      produtos = await Produto.findAll({ where: { nome: req.query.nome }});
    } else if (req.query.categoria) {
      produtos = await Produto.findAll({ where: { categoria: req.query.categoria }});
    } else {
      produtos = await Produto.findAll();
    }
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

// Mostra os dados do produto pelo id
router.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
});

module.exports = router;