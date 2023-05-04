# SoulPet - Projeto DevOps 3 - Back-End

[SoulPet - Projeto DevOps 3 - Front-End](https://github.com/oliverdn95/soulpet-front)


## Integrantes:

- **Ana Schwaab** - [Github](https://github.com/anaschwaab), [LinkedIn](https://www.linkedin.com/in/ana-schwaab/)
- **Bruna Faria de Souza** - [Github](https://github.com/Brunafariia), [LinkedIn](https://www.linkedin.com/in/bruna-faria-de-souza-7b31a019b/)
- **Danilo Araújo de Oliveira** - [Github](https://github.com/oliverdn95), [LinkedIn](https://www.linkedin.com/in/oliverdn95/)
- **Luis Guedes** - [Github](https://github.com/luisgued3s), [LinkedIn](https://www.linkedin.com/in/guedes-luis/)
- **Nilson Mazurchi** - [Github](https://github.com/nilsonmazurchi), [LinkedIn](https://www.linkedin.com/in/nilson-mazurchi/)

## Lista de conteúdos:
- [SoulPet Front-end](#soulpet---projeto-devops-3---back-end1)
- [Integrandes do projeto](#integrantes)
- [O que é o SoulPet API](#o-que-é-o-soulpet-api)
- [O que consigo fazer com o SoulPet API?](#o-que-consigo-fazer-com-o-soulpet-api)
- [Tecnologias usadas](#tecnologias-usadas)
- [Melhorias em desenvolvimento](#melhorias-que-estão-em-desenvolvimento)
- [Para rodar o projeto](#para-rodar-o-projeto)
  1. [Baixar MySQL, git e Node.js.](#para-rodar-o-projeto)
  2. [Fazer `git clone` do repositório.](#para-rodar-o-projeto)
  3. [Instalar dependências do projeto.](#para-rodar-o-projeto)
  4. [Configurar o arquivo `.env`.](#para-rodar-o-projeto)
- [Funcionalidades da API](#funcionalidades-da-api)
  1. [Agendamentos](#agendamentos)
  2. [Clientes](#clientes)
  3. [Pedidos](#pedidos)
  4. [Pets](#pets)
  5. [Produtos](#produtos)
  6. [Servicos](#servicos)
- [Agradecimentos Especiais](#soulcode-academy---bootcamp-react-nodejs)

## O que é o SoulPet API?
É uma API para você utilizar para gerenciar seu Petshop, e o Soul, vem de SoulCode Academy.

## O que consigo fazer com o SoulPet API?
É possível editar os modelos existentes de tabelas para melhor atender suas necessidades, porém já temos alguns modelos prontos como os de:
- gerenciar clientes.
- gerenciar pets.
- gerenciar pedido.
- gerenciar pets.
- gerenciar produtos.
- gerenciar servicos.

### Tecnologias usadas:
Um projeto feito com uso de `Node.Js`, `Express`, `Sequelize`, `MySQL2`, `Morgan`, `DotEnv`, `Cors`, `Helmet`, `compression`, `Nodemon`.

### Melhorias que estão em desenvolvimento:
  Nenhuma melhoria prevista por enquanto.


## Para rodar o projeto
1. É necessário que tenha o [MySQL Workbench](https://www.mysql.com/products/workbench/), [git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git) e o [Node.Js](https://nodejs.org/en/download) instalados.

2. É necessário fazer o clone do repositório para sua máquina 
- ```git clone https://github.com/oliverdn95/soulpet-back.git```

3. Instalar as dependências do projeto: 
- dentro da pasta raiz do projeto executar o comando: ```npm install```

4. Criar uma copia do arquivo `.env.example` 
- Alterar o nome da cópia para `.env` 
- no campo `DB_PASSWORD` colocar a mesma senha que foi criada pro MySQL Workbench.

## Funcionalidades da API

- ### Agendamentos
  Temos os seguinte caminho basta acessar agendamentos `http:localhost:3001/agendamentos` para as rotas:
    - #### GET
      Apenas devolve lista de todos os agendamentos adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para agendamentos, necessita dos seguintes dados no corpo da requisição:
        - dataAgendada - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - realizada - do tipo Booleano, ex: `true`.
        - petId - do tipo Inteiro, ex: `1`.
        - servicoId - do tipo Inteiro, ex: `1`.
  
  Para o seguinte caminho basta acessar agendamentos `http:localhost:3001/agendamentos/:id` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o agendamento com o id que foi encaminhado pela rota, ex: `http:localhost:3001/agendamentos/1` iria devolver só o agendamento de id 1.

    - #### PUT
      Edita os dados do agendamento do id informado, ex: `http:localhost:3001/agendamentos/1` atualiza os dados do agendamento de id 1, necessita de passar os seguintes dados no corpo da requisição:
        - dataAgendada - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - realizada - do tipo Booleano, ex: `true`.
        - petId - do tipo Inteiro, ex: `1`.
        - servicoId - do tipo Inteiro, ex: `1`.
    - #### DELETE
      Deleta do banco os dados relacionados ao id do agendamento, ex: `http:localhost:3001/agendamentos/1`.

  Para o seguinte caminho basta acessar agendamentos `http:localhost:3001/agendamentos/all` para a rota:
    - #### DELETE
      Deleta todos os agendamentos do banco de dados.

      **PS: Cuidado para não ser promovido a cliente.**

- ### Clientes
  Temos os seguinte caminho basta acessar clientes `http:localhost:3001/clientes` para as rotas:
    - #### GET
      Apenas devolve lista de todos os clientes adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para clientes, necessita dos seguintes dados no corpo da requisição:
        - nome - do tipo String, ex: `"Danilo"`.
        - email - do tipo String, e ele é único, ex: `"exemplo@exemplo.exe"`.
        - telefone - do tipo String, ex: `"(99)99999-9999"`.
        - endereco - é um Objeto que contém os seguintes dados:
          - uf - do tipo String, com limite de 2 caractéres, ex: `"SP"`.
          - cidade - do tipo String, ex: `"São Paulo"`.
          - cep - do tipo String, com limite de 9 caractéres, ex: `"00000-000"`.
          - rua - do tipo String, ex: `"Avenida Brasil"`.
          - numero - do tipo String, ex: `"3-33"`.
  
  Para o seguinte caminho basta acessar clientes `http:localhost:3001/clientes/:id` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o cliente com o id que foi encaminhado pela rota, ex: `http:localhost:3001/clientes/1` iria devolver só o cliente de id 1.

    - #### PUT
      Edita os dados do cliente do id informado, ex: `http:localhost:3001/clientes/1` atualiza os dados do cliente de id 1, necessita de passar os seguintes dados no corpo da requisição:
        - dataAgendada - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - realizada - do tipo Booleano, ex: `true`.
        - petId - do tipo Inteiro, ex: `1`.
        - servicoId - do tipo Inteiro, ex: `1`.
    - #### DELETE
      Deleta do banco os dados relacionados ao id do cliente, também deleta o endereço do cliente já que o endereço pertence ao cliente, ex: `http:localhost:3001/clientes/1`.

  Para o seguinte caminho basta acessar clientes `http:localhost:3001/clientes/:id/pets` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve todos os pets do tutor com o id que foi encaminhado pela rota, ex: `http:localhost:3001/clientes/1/pets` iria devolver todos os pets do cliente de id 1.

- ### Pedidos
  Temos os seguinte caminho basta acessar pedidos `http:localhost:3001/pedidos` para as rotas:
    - #### GET
      Apenas devolve lista de todos os pedidos adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para pedidos, necessita dos seguintes dados no corpo da requisição:
        <!-- TODO -->
  
  Para o seguinte caminho basta acessar pedidos `http:localhost:3001/pedidos/:codigo` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o pedido com o id que foi encaminhado pela rota, ex: `http:localhost:3001/pedidos/1` iria devolver só o pedido de id 1.

    - #### PUT
      Edita os dados do pedido do id informado, ex: `http:localhost:3001/pedidos/1` atualiza os dados do pedido de id 1, necessita de passar os seguintes dados no corpo da requisição:
        <!-- TODO -->
  
    - #### DELETE
      Deleta do banco os dados relacionados ao id do pedido, ex: `http:localhost:3001/pedidos/1`.

  Para o seguinte caminho basta acessar pedidos `http:localhost:3001/pedidos/clientes/:id` para a rota:
    - #### GET
      Mostra todos os pedidos do cliente que informar o `:id` do banco de dados.
    
    - #### DELETE
      Deleta todos os pedidos do cliente que informar o `:id` do banco de dados.

      **PS: Cuidado para não ser promovido a cliente.**

  Para o seguinte caminho basta acessar pedidos `http:localhost:3001/pedidos/produtos/:id` para a rota:
    - #### GET
      Mostra todos que contém os pedidos do produto que informar o `:id` do banco de dados.
    
    - #### DELETE
      Deleta todos que contém os pedidos do produto que informar o `:id` do banco de dados.

      **PS: Cuidado para não ser promovido a cliente.**

- ### Pets
  Temos os seguinte caminho basta acessar pets `http:localhost:3001/pets` para as rotas:
    - #### GET
      Apenas devolve lista de todos os pets adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para pets, necessita dos seguintes dados no corpo da requisição:
        - nome - do tipo String, de no máximo 130 caractéres, ex: `"Malu"`.
        - tipo - do tipo String, de no máximo 100 caractéres, ex: `"Cachorro"`.
        - porte - do tipo String, de no máximo 100 caractéres, ex: `"Pequeno"`.
        - dataNasc - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - clienteId - do tipo Inteiro, ex: `1`.
  
  Para o seguinte caminho basta acessar pets `http:localhost:3001/pets/:id` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o pet com o id que foi encaminhado pela rota, ex: `http:localhost:3001/pets/1` iria devolver só o pet de id 1.

    - #### PUT
      Edita os dados do pet do id informado, ex: `http:localhost:3001/pets/1` atualiza os dados do pet de id 1, necessita de passar os seguintes dados no corpo da requisição:
        - nome - do tipo String, de no máximo 130 caractéres, ex: `"Malu"`.
        - tipo - do tipo String, de no máximo 100 caractéres, ex: `"Cachorro"`.
        - porte - do tipo String, de no máximo 100 caractéres, ex: `"Pequeno"`.
        - dataNasc - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - clienteId - do tipo Inteiro, ex: `1`.

    - #### DELETE
      Deleta do banco os dados relacionados ao id do pet, ex: `http:localhost:3001/pets/1`.

- ### Produtos
  Temos os seguinte caminho basta acessar produtos `http:localhost:3001/produtos` para as rotas:
    - #### GET
      Apenas devolve lista de todos os produtos adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para produtos, necessita dos seguintes dados no corpo da requisição:
        - nome - do tipo String, ex: `"Osso de Brinquedo"`.
        - descricao - do tipo String, de no máximo 150 caractéres, ex: `"Osso de brinquedo para cachorros"`.
        - preco - do tipo Float, ex: `10.50`.
        - desconto - do tipo Float, ex: `15`.
        - dataNasc - do tipo DataOnly no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - categoria - do tipo String, aceita os que estão cadastrados no modelo ["Higiene", "Brinquedos", "Conforto", "Alimentacao", "Medicamentos"], ex: `"Higiene"`.
  
  Para o seguinte caminho basta acessar produtos `http:localhost:3001/produtos/:id` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o produto com o id que foi encaminhado pela rota, ex: `http:localhost:3001/produtos/1` iria devolver só o produto de id 1.

    - #### PUT
      Edita os dados do produto do id informado, ex: `http:localhost:3001/produtos/1` atualiza os dados do produto de id 1, necessita de passar os seguintes dados no corpo da requisição:
        - nome - do tipo String, ex: `"Osso de Brinquedo"`.
        - descricao - do tipo String, de no máximo 150 caractéres, ex: `"Osso de brinquedo para cachorros"`.
        - preco - do tipo Float, ex: `10.50`.
        - desconto - do tipo Float, ex: `15`.
        - dataNasc - do tipo DataOnly no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - categoria - do tipo String, aceita os que estão cadastrados no modelo ["Higiene", "Brinquedos", "Conforto", "Alimentacao", "Medicamentos"], ex: `"Higiene"`.

    - #### DELETE
      Deleta do banco os dados relacionados ao id do produto, ex: `http:localhost:3001/produtos/1`.

  Para o seguinte caminho basta acessar produtos `http:localhost:3001/produtos/all` para a rota:
    - #### DELETE
      Deleta todos os produtos do banco de dados.

      **PS: Cuidado para não ser promovido a cliente.**

- ### Pets
  Temos os seguinte caminho basta acessar pets `http:localhost:3001/pets` para as rotas:
    - #### GET
      Apenas devolve lista de todos os pets adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para pets, necessita dos seguintes dados no corpo da requisição:
        - nome - do tipo String, de no máximo 130 caractéres, ex: `"Malu"`.
        - tipo - do tipo String, de no máximo 100 caractéres, ex: `"Cachorro"`.
        - porte - do tipo String, de no máximo 100 caractéres, ex: `"Pequeno"`.
        - dataNasc - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - clienteId - do tipo Inteiro, ex: `1`.
  
  Para o seguinte caminho basta acessar pets `http:localhost:3001/pets/:id` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o pet com o id que foi encaminhado pela rota, ex: `http:localhost:3001/pets/1` iria devolver só o pet de id 1.

    - #### PUT
      Edita os dados do pet do id informado, ex: `http:localhost:3001/pets/1` atualiza os dados do pet de id 1, necessita de passar os seguintes dados no corpo da requisição:
        - nome - do tipo String, de no máximo 130 caractéres, ex: `"Malu"`.
        - tipo - do tipo String, de no máximo 100 caractéres, ex: `"Cachorro"`.
        - porte - do tipo String, de no máximo 100 caractéres, ex: `"Pequeno"`.
        - dataNasc - do tipo Data no modelo YYYY-MM-DD, ex: `"2000-01-01"`.
        - clienteId - do tipo Inteiro, ex: `1`.

    - #### DELETE
      Deleta do banco os dados relacionados ao id do pet, ex: `http:localhost:3001/pets/1`.

- ### Servicos
  Temos os seguinte caminho basta acessar servicos `http:localhost:3001/servicos` para as rotas:
    - #### GET
      Apenas devolve lista de todos os servicos adicionados, não necessita passar nenhum dado pelo corpo da requisição.

    - #### POST
      Adiciona um novo item no banco de dados para servicos, necessita dos seguintes dados no corpo da requisição:
        - nome - do tipo String, ex: `"Banho"`.
        - preco - do tipo Float, ex: `25`.
  
  Para o seguinte caminho basta acessar servicos `http:localhost:3001/servicos/:id` para acessar as rotas que utilizam o próprio `:id` da consulta:
    - #### GET
      Devolve apenas o servico com o id que foi encaminhado pela rota, ex: `http:localhost:3001/servicos/1` iria devolver só o servico de id 1.

    - #### PUT
      Edita os dados do servico do id informado, ex: `http:localhost:3001/servicos/1` atualiza os dados do servico de id 1, necessita de passar os seguintes dados no corpo da requisição:
        - nome - do tipo String, ex: `"Banho"`.
        - preco - do tipo Float, ex: `25`.

    - #### DELETE
      Deleta do banco os dados relacionados ao id do servico, ex: `http:localhost:3001/servicos/1`.

  Para o seguinte caminho basta acessar servicos `http:localhost:3001/servicos/all` para a rota:
    - #### DELETE
      Deleta todos os servicos do banco de dados.

      **PS: Cuidado para não ser promovido a cliente.**


## SoulCode Academy - Bootcamp React Node.js
Agradecimento especial para os Professores:

- Gabriel Braga  - [Github](https://github.com/gabriel-soulcode), [LinkedIn](https://www.linkedin.com/in/f-gabriel-braga/)
- Jose Almir  - [Github](https://github.com/jose-almir), [LinkedIn](https://www.linkedin.com/in/jose-almir/)

