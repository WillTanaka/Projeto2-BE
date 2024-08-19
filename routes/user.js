const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

// Rota para cadastro de novos usuários
router.post('/register', userController.register);

// Rota para atualizar os dados do próprio usuário
router.put('/update', authMiddleware, userController.updateUser);

// Rota para criar novos administradores (apenas admins podem acessar)
router.post('/create-admin', authMiddleware, userController.createAdmin);

// Rota para excluir usuários (apenas admins podem acessar)
router.delete('/delete/:id', authMiddleware, userController.deleteUser);

module.exports = router;