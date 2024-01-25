const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {
  const { id } = req.usuario;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: 'Campos Obrigatórios não preenchidos' });
    }

    const validarCategoria = await pool.query(
      'select * from categorias where id = $1 ',
      [categoria_id],
    );

    if (validarCategoria.rowCount < 1) {
      return res.status(400).json({ mensagem: 'Categoria não identificada.' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      return res
        .status(400)
        .json({ mensagem: 'Tipo de transação não identificada.' });
    }

    const query = `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *`;
    const { rows } = await pool.query(query, [
      descricao,
      valor,
      data,
      categoria_id,
      id,
      tipo,
    ]);

    const cadastroTransacao = await pool.query(
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

    return res.json(cadastroTransacao.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = cadastrarTransacao;
