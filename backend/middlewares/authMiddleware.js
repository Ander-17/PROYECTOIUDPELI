const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // 1. Obtener el token directamente desde las cookies del navegador
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se encontró la cookie de autenticación.' });
  }

  try {
    // 2. Verificar el token usando la clave secreta
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_temporal');
    
    // 3. Adjuntar la información del usuario a la petición
    req.usuario = decodificado;
    
    // 4. Continuar con la ejecución
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'El token es inválido o ya ha expirado.' });
  }
};

module.exports = verificarToken;