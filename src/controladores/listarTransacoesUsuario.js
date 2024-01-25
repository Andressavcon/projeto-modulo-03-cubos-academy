const pool = require('../conexao');

const listarTransacoesUsuarios = async (req, res) => {
  const { id } = req.usuario;

  try {
    const { rows } = await pool.query(
      `
      select
      t.id as id,
      tipo,
      t.descricao as descricao,
      valor,
      data,
      usuario_id,
      c.id as categoria_id,
      c.descricao as categoria_nome
      from categorias c
      inner join transacoes t on c.id = t.categoria_id
      where usuario_id = $1;
      `,
      [id],
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json('Erro interno do servidor');
  }
};

module.exports = listarTransacoesUsuarios;
