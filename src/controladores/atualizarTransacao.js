const pool = require('../conexao');

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const validarIdTransacao = await pool.query(
      'select * from transacoes where id = $1',
      [id],
    );

    if (validarIdTransacao.rowCount === 0) {
      return res.status(400).json({ mensagem: 'Transação não identificada.' });
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res
        .status(400)
        .json({ mensagem: 'Campos Obrigatórios não preenchidos' });
    }

    const validarCategoria = await pool.query(
      'select * from categorias where id = $1',
      [categoria_id],
    );

    if (validarCategoria.rowCount === 0) {
      return res.status(400).json({ mensagem: 'Categoria não identificada.' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
      return res
        .status(400)
        .json({ mensagem: 'Tipo de transação não identificada.' });
    }

    const query = `
    UPDATE transacoes SET
    descricao= $1,
    valor= $2,
    data= $3,
    categoria_id= $4,
    tipo= $5
    WHERE id = $6;
    `;

    await pool.query(query, [descricao, valor, data, categoria_id, tipo, id]);

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = atualizarTransacao;
