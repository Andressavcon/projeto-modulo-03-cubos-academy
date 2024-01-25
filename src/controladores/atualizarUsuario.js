const pool = require('../conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ mensagem: 'Campos Obrigatórios não preenchidos' });
    }

    const validarEmail = await pool.query(
      'select * from usuarios where email = $1 and id <> $2',
      [email, id],
    );

    if (validarEmail.rowCount > 0) {
      return res.status(400).json({ mensagem: 'Email ja cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query = `
    UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4
    `;

    const { rows } = await pool.query(query, [
      nome,
      email,
      senhaCriptografada,
      id,
    ]);

    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = atualizarUsuario;
