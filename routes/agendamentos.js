const express = require('express');
const router = express.Router();
const Agendamentos = require('../database/agendamento');
const Pet = require("../database/pet");
const Servico = require('../database/servico');


router.post("/agendamentos", async (req, res) => {
    const { dataAgendada, realizada, petId, servicoId } = req.body;

    try {
        const pet = await Pet.findByPk(petId)
        if (pet){
            const servico = await Servico.findByPk(servicoId);
            if (servico) {
                const novoAgendamento = await Agendamentos.create({ dataAgendada, realizada, petId, servicoId });
                res.status(201).json(novoAgendamento);
            } else{
                res.status(404).json( { message: "Serviço não encontrado."});
            }
            
        } else {
            res.status(404).json( { message: "Pet não encontrado."});
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

module.exports = router;