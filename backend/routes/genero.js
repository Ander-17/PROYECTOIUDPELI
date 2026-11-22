const { Router } = require('express');
const { getGeneros, createGenero, updateGenero } = require('../controllers/generoController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

router.get('/', getGeneros);

router.post('/', verificarToken, createGenero);
router.put('/:id', verificarToken, updateGenero);

module.exports = router;