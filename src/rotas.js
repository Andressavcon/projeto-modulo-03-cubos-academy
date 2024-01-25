const express = require('express');
const cadastrarUsuario = require('./controladores/cadastrarUsuario');
const loginUsuario = require('./controladores/loginUsuario');
const validacao = require('./intermediarios/validacao');
const detalharUsuario = require('./controladores/detalharUsuario');
const atualizarUsuario = require('./controladores/atualizarUsuario');
const listarCategoria = require('./controladores/listarCategoria');
const listarTransacoesUsuarios = require('./controladores/listarTransacoesUsuario');
const detalharTransacao = require('./controladores/detalharTransacao');
const cadastrarTransacao = require('./controladores/cadastrarTransacao');
const atualizarTransacao = require('./controladores/atualizarTransacao');
const excluirTransacao = require('./controladores/excluirTransacao');
const obterExtrato = require('./controladores/obterExtrato');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario);

rotas.use(validacao);
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);
rotas.get('/categoria', listarCategoria);
rotas.get('/transacao', listarTransacoesUsuarios);
rotas.get('/transacao/extrato', obterExtrato);
rotas.get('/transacao/:id', detalharTransacao);
rotas.post('/transacao', cadastrarTransacao);
rotas.put('/transacao/:id', atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);

module.exports = rotas;
