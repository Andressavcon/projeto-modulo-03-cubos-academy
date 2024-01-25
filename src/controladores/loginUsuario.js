const pool = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('./senhaJwt');

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res
        .status(400)
        .json({ mensagem: 'Campos Obrigatórios não preenchidos' });
    }

    const validarUsuario = await pool.query(
      'select * from usuarios where email = $1',
      [email],
    );

    if (validarUsuario.rowCount < 1) {
      return res.status(400).json({ mensagem: 'Email ou senha inválida.' });
    }

    const validarSenha = await bcrypt.compare(
      senha,
      validarUsuario.rows[0].senha,
    );

    if (!validarSenha) {
      return res.status(404).json({ mensagem: 'Email ou senha inválida.' });
    }

    const token = jwt.sign({ id: validarUsuario.rows[0].id }, senhaJwt, {
      expiresIn: '1d',
    });

    const { senha: xxxx, ...usuario } = validarUsuario.rows[0];

    return res.status(200).json({ validarUsuario: usuario, token });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = loginUsuario;
