const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se encontró la cookie de autenticación.' });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_temporal');

    req.usuario = decodificado;

    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'El token es inválido o ya ha expirado.' });
  }
};

module.exports = verificarToken;