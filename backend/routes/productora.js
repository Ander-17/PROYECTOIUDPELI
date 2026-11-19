const { Router } = require('express');
const { getProductoras, createProductora, updateProductora } = require('../controllers/productoraController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

// 🔓 RUTA PÚBLICA: Cualquiera puede ver las productoras
router.get('/', getProductoras);

// 🔒 RUTAS PROTEGIDAS: Exigen el token JWT para crear o modificar
router.post('/', verificarToken, createProductora);
router.put('/:id', verificarToken, updateProductora);

module.exports = router;