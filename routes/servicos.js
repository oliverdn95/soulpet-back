// [BE-10] Criar recurso GET para listagem de Serviços#10

const { Router } = require("express");
const Servico = require("../database/servico");

const router = Router();

router.get("/servicos", async (req, res) => {
    const listaServicos = await Servico.findAll();
    res.json(listaServicos);
});

router.get("/servicos/:id", async (req, res) => {
    const servicos = await Servico.findOne({
        where: { id: req.params.id },
    });

    if (servicos) {
        res.json(servicos);
    } else {
        res.status(404).json({ message: "Serviço não encontrado." });
    }
});

// [BE-11] Criar recurso POST para inserção de Serviços#11
router.post("/servicos", async (req, res) => {
    const { nome, preco } = req.body;

    // Atualizar conforme o modelo de validação da categoria de Servicos
    try {
        if( nome && preco && nome !== "" && preco > 0 ){
            const novoServico = await Servico.create({
                nome,
                preco
              });
            res.status(201).json(novoServico);
        } else if( preco ){
            if (preco <= 0 ){
                return res.status(400).json({
                    message: "Por favor, digite um preco válido.",
                  });
            }else{
                return res.status(400).json({
                    message: "Por favor, digite um nome válido.",
                });
            }
        } else if( nome ){
            if (nome === "" ){
                return res.status(400).json({
                    message: "Por favor, digite um nome válido.",
                  });
            }else{
                return res.status(400).json({
                    message: "Por favor, digite um preco válido.",
                });
            }
        }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

module.exports = router;