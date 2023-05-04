const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const Servico = require("./servico");

const Agendamentos = connection.define("agendamento", {
  dataAgendada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  realizada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

// Relacionamento 1:N (Um Pet/Servico pode ter N Agendamentos)
Pet.hasMany(Agendamentos, { onDelete: "CASCADE" });
Servico.hasMany(Agendamentos, { onDelete: "CASCADE" });


module.exports = Agendamentos;
