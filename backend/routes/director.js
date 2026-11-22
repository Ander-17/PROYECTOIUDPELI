const { Router } = require('express');
const { getDirectores, createDirector, updateDirector } = require('../controllers/directorController');
const verificarToken = require('../middlewares/authMiddleware'); 

const router = Router();

router.get('/', getDirectores);

router.post('/', verificarToken, createDirector);
router.put('/:id', verificarToken, updateDirector);

module.exports = router;