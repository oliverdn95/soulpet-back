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

router.post("/produtos", async (req, res) => {
  const { nome, descricao, preco, desconto, dataDesconto, categoria } = req.body;
  // Atualizar conforme o modelo de validação da categoria de Produto
  const categorias = ["Higiene", "Brinquedos", "Conforto", "Alimentação", "Medicamentos"]

  try {
    if ((dataDesconto)|| (desconto) || (categoria)){

      if(desconto < 0 || desconto > 100){
        return res.status(400).json( { message: "Por favor, digite uma porcentagem de desconto válida."});
      }
      
      if(!categorias.includes(categoria)){
        return res.status(400).json({ message: "Categoria inválida." });
      }

      if(new Date() >= new Date(dataDesconto)){
        return res.status(400).json({ message: "Desconto vencido." });
      }
      
      const novoProduto = await Produto.create({ nome, descricao, preco, desconto, dataDesconto, categoria });
      res.status(201).json(novoProduto);
    }
    
  } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Um erro aconteceu." });
  }
});


module.exports = router;