const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menuController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

router.get('/', menuCtrl.getMenu);
router.post('/', authMiddleware, adminMiddleware, menuCtrl.createItem);
router.delete('/:id', authMiddleware, adminMiddleware, menuCtrl.deleteItem);

module.exports = router;
