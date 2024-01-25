const pool = require('../conexao');

const detalharTransacao = async (req, res) => {
  const { id } = req.usuario;
  const { id: id2 } = req.params;

  try {
    const validarIdTransacao = await pool.query(
      'select * from transacoes where id = $1 and usuario_id = $2',
      [id2, id],
    );

    if (validarIdTransacao.rowCount < 1) {
      return res.status(400).json({ mensagem: 'Transação não identificada.' });
    }

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
      where usuario_id = $1 and t.id = $2;
      `,
      [id, id2],
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json('Erro interno do servidor');
  }
};

module.exports = detalharTransacao;
