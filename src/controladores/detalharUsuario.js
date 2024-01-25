const detalharUsuario = async (req, res) => {
  try {
    const { senha: _, ...usuario } = req.usuario;

    if (!usuario) {
      return res.status(401).json({
        message:
          'Para acessar este recurso um token de autenticação válido deve ser enviado.',
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = detalharUsuario;
