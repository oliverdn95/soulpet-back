const express = require('express');
const router = express.Router();
const Agendamentos = require('../database/agendamento');
const Pet = require("../database/pet");
const Servico = require('../database/servico');


router.post("/agendamentos", async (req, res) => {
    const { dataAgendada, realizada, petId, servicoId } = req.body;

    try {
        const pet = await Pet.findByPk(petId)
        if (pet) {
            const servico = await Servico.findByPk(servicoId);
            if (servico) {
                const novoAgendamento = await Agendamentos.create({ dataAgendada, realizada, petId, servicoId });
                res.status(201).json(novoAgendamento);
            } else {
                res.status(404).json({ message: "Serviço não encontrado." });
            }

        } else {
            res.status(404).json({ message: "Pet não encontrado." });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});


router.put("/agendamentos/:id", async (req, res) => {
    const { dataAgendada, realizada, petId, servicoId } = req.body;
    const agendamento = await Agendamentos.findByPk(req.params.id);

    try {
        if (agendamento) {
            await Agendamentos.update(
                { dataAgendada, realizada, petId, servicoId },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Agendamento editado com sucesso!" });
        } else {
            res.status(404).json({ message: "Agendamento não encontrado." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// [BE-14] Criar recurso GET para listagem de Agendamentos#14

router.get("/agendamentos", async (req, res) => {
    const listaAgendamentos = await Agendamentos.findAll();
    res.json(listaAgendamentos);
});

router.get("/agendamentos/:id", async (req, res) => {
    const { id } = req.params;

    const agendamento = await Agendamentos.findByPk(id);
    if (agendamento) {
        res.json(agendamento);
    } else {
        res.status(404).json({ message: "Agendamento não encontrado." });
    }
});

// Rota DELETE que exclui todos os agendamentos
router.delete("/agendamentos/all", async (req, res) => {
  try {
    await Agendamentos.destroy({ where: {} });
    res.status(200).json({message: "Todos os agendamentos foram removidos com sucesso!"});
  } catch(err){
    console.error(err);
    res.status(500).json({message: "Erro ao remover todos os agendamentos!"});
  }
})

  //Delete
// Rota DELETE que remove um agendamento de acordo com sua ID
router.delete("/agendamentos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const agendamento = await Agendamentos.findByPk(id);
    if (!agendamento) {
      return res.status(404).json({message:"Agendamento não encontrado!"});
    }
    await agendamento.destroy();
    res.status(200).json({message: "Agendamento removido com sucesso!"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Erro ao remover o agendamento!"});
  }
});

module.exports = router;