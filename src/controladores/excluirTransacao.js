const pool = require('../conexao');

const excluirTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const validarIdTransacao = await pool.query(
      'select * from transacoes where id = $1',
      [id],
    );

    if (validarIdTransacao.rowCount === 0) {
      return res.status(400).json({ mensagem: 'Transação não identificada.' });
    }

    const query = `
        DELETE from transacoes WHERE id = $1;
        `;

    await pool.query(query, [id]);

    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = excluirTransacao;
