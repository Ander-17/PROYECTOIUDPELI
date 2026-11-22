const { Router } = require('express');
const { getTipos, createTipo, updateTipo } = require('../controllers/tipoController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

router.get('/', getTipos);

router.post('/', verificarToken, createTipo);
router.put('/:id', verificarToken, updateTipo);

module.exports = router;