const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar el usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    // 2. Verificar contraseña
    const esPasswordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!esPasswordCorrecto) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    // 3. Generar el Token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || 'clave_secreta_temporal',
      { expiresIn: '2h' }
    );

    // 4. Guardar el token en una Cookie HttpOnly ultrasegura
    res.cookie('token', token, {
      httpOnly: true, // Inaccesible para JavaScript del lado del cliente (protege contra XSS)
      secure: process.env.NODE_ENV === 'production', // true en producción (HTTPS), false en local (HTTP)
      sameSite: 'lax', // Protección contra ataques CSRF
      maxAge: 2 * 60 * 60 * 1000 // Expira en 2 horas
    });

    return res.status(200).json({ mensaje: 'Login exitoso' });

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

const logout = (req, res) => {
  try {
    // Limpiar la cookie de autenticación
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    return res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al cerrar sesión', error: error.message });
  }
};

module.exports = {
  login,
  logout
};