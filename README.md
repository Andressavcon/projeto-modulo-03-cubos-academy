# Projeto módulo 03 - Cubos Academy
Uma RESTful API, construida em dupla, praticando nossos conhecimentos teóricos do backend adquiridos e com bastante uso do fluxo git, aplicado ao trabalho em equipe. 

## Bibliotecas utilizadas
- Express.js
- Nodemon
- Bcrypt
- Jsonwebtoken
- Pg

## Funcionalidades:
- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Listar transações
- Detalhar transação
- Cadastrar transação
- Editar transação
- Remover transação
- Obter extrato de transações

## Dados
-  Banco de Dados PostgreSQL chamado "dindin", com as tabelas usuarios, categorias, transacoes (incluidos no arquivo dump.sql)

## Requisitos obrigatórios
- A API criada acessa o banco de dados "dindin" para persistir e manipular os dados das tabelas utilizados pela aplicação.
- O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- Código deve estar organizado (index.js, servidor.js, rotas.js, pasta controladores)
- Valor em dinheiro, representado em centavos
- Utilizar status code adequado