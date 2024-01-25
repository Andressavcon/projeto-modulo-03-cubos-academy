const pool = require('../conexao');

const obterExtrato = async (req, res) => {
  const { id } = req.usuario;

  try {
    const entrada = await pool.query(
      `
        select coalesce(sum(valor), 0) as total
        from transacoes
        where usuario_id = $1 and tipo = 'entrada';
      `,
      [id],
    );

    const somaEntrada = entrada.rows[0].total;

    const saida = await pool.query(
      `
        select coalesce(sum(valor), 0) as total
        from transacoes
        where usuario_id = $1 and tipo = 'saida';
      `,
      [id],
    );

    const somaSaida = saida.rows[0].total;

    const extratoFinal = {
      entrada: somaEntrada,
      saida: somaSaida,
    };

    return res.status(200).json(extratoFinal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = obterExtrato;
