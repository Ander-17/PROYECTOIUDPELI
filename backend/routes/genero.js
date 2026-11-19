const { Router } = require('express');
const { getGeneros, createGenero, updateGenero } = require('../controllers/generoController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

// 🔓 RUTA PÚBLICA: Cualquiera puede ver los géneros
router.get('/', getGeneros);

// 🔒 RUTAS PROTEGIDAS: Exigen el token JWT para crear o modificar
router.post('/', verificarToken, createGenero);
router.put('/:id', verificarToken, updateGenero);

module.exports = router;