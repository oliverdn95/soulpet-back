// Importações principais e variáveis de ambiente
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require('compression');
const helmet = require("helmet");


// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));

// Configurações de acesso
app.use(cors({ origin: "http://localhost:3000" }));

// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar a conexão

// Configurações de Segurança
//Helmet - Ocultador de cabeçalhos HTTP
app.use(helmet());
app.disable("x-powered-by")

//Camuflando os cookies de sessão
const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);

//Performance
// middleware de compactação gzip
app.use(compression());

// Definição de Rotas
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");
const rotasProdutos = require("./routes/produtos");
const rotasServicos = require("./routes/servicos");
const rotasAgendamentos = require("./routes/agendamentos");
const rotasPedidos = require("./routes/pedidos");
const rotasHealthChecker = require ("./routes/healthchecker")

// Juntar ao app as rotas dos arquivos
app.use(rotasClientes); // Configurar o grupo de rotas no app
app.use(rotasPets);
app.use(rotasProdutos);
app.use(rotasServicos);
app.use(rotasAgendamentos);
app.use(rotasPedidos);
app.use(rotasHealthChecker);

// Escuta de eventos (listen)
app.listen(3001, () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  connection.sync();
  console.log("Servidor rodando em http://localhost:3001/");
});
