// [BE-10] Criar recurso gitGET para listagem de Serviços#10

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

module.exports = router;