const { Router } = require('express');
const { getMedia, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

// 🔓 RUTA PÚBLICA: Cualquiera puede ver la lista de multimedia en la web
router.get('/', getMedia);

// 🔒 RUTAS PROTEGIDAS: Exigen el token JWT para crear, modificar o eliminar
router.post('/', verificarToken, createMedia);
router.put('/:serial', verificarToken, updateMedia);
router.delete('/:serial', verificarToken, deleteMedia);

module.exports = router;