const { Router } = require('express');
const { getProductoras, createProductora, updateProductora } = require('../controllers/productoraController');
const verificarToken = require('../middlewares/authMiddleware'); // 1. Importamos el middleware

const router = Router();

router.get('/', getProductoras);

router.post('/', verificarToken, createProductora);
router.put('/:id', verificarToken, updateProductora);

module.exports = router;