const express = require('express');
const authService = require('../services/auth');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.authenticate(username, password);
    
    if (result.success) {
        res.json({ token: result.token });
    } else {
        res.status(401).json({ message: result.message });
    }
});

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operações relacionadas à autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Token de autenticação gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

module.exports = router;