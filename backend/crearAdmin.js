const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';
const isCrossSite = process.env.COOKIE_SAME_SITE === 'none';

const cookieOptions = {
  httpOnly: true, 
  secure: isProduction || isCrossSite, 
  sameSite: isCrossSite ? 'none' : 'lax',
  maxAge: 2 * 60 * 60 * 1000 
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ mensaje: 'Error de configuración del servidor (JWT_SECRET no definido)' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const esPasswordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!esPasswordCorrecto) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, cookieOptions);

    return res.status(200).json({ mensaje: 'Login exitoso' });

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: cookieOptions.sameSite,
      secure: cookieOptions.secure
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