const { Router } = require('express');
const { getDirectores, createDirector, updateDirector } = require('../controllers/directorController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

// 🔓 RUTA PÚBLica: Cualquiera puede ver la lista de directores
router.get('/', getDirectores);

// 🔒 RUTAS PROTEGIDAS: Exigen el token JWT para poder crear o modificar
router.post('/', verificarToken, createDirector);
router.put('/:id', verificarToken, updateDirector);

module.exports = router;