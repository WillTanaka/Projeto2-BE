const express = require("express");
const router = express.Router();
const { sucess, fail } = require("../helpers/resposta");
const userDAO = require('../services/userDAO');
const auth = require('../middlewares/auth');

// Listar users
router.get("/", async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;
    const validLimites = [5, 10, 30];
    if (!validLimites.includes(parseInt(limite))) {
        return res.status(400).json(fail("Valor de limite inválido, inseria 5, 10 ou 30"));
    }

    const users = await userDAO.list(parseInt(limite), parseInt(pagina));
    res.json(sucess(users, "list"));
});

// Cadastrar user
router.post("/", async (req, res) => {
    const { username, password, email } = req.body;
    let user = await userDAO.save(username, password, email);
    if (user)
        res.json(sucess(user));
    else 
        res.status(500).json(fail("Falha ao salvar o novo usuário"));
});

// Editar user
router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    
    // Verificar se o user está tentando atualizar a si mesmo ou se é um administrador
    if (req.user.isAdmin || req.user.id === id) {
        let updatedUser = await userDAO.update(id, username, email, password);
        if (updatedUser)
            res.json(sucess(updatedUser));
        else
            res.status(500).json(fail("Falha ao editar o usuário"));
    } else {
        res.status(403).json(fail("Acesso negado"));
    }
});

// Excluir user (apenas administradores podem)
router.delete("/:id", auth, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json(fail("Acesso negado"));
    }
    let result = await userDAO.delete(req.params.id);
    if (result)
        res.json(sucess(result));
    else
        res.status(500).json(fail("Usuário não encontrado"));
});

// Criar administrador (apenas administradores podem)
router.post("/create-admin", auth, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json(fail("Acesso negado"));
    }
    const { username, password, email } = req.body;
    let admin = await userDAO.save(username, password, email, true);
    if (admin)
        res.status(201).json(sucess(admin));
    else 
        res.status(500).json(fail("Falha ao criar o administrador"));
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Erro ao listar usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao salvar o usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Edita um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Falha ao atualizar o usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /users/create-admin:
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Falha ao criar o administrador
 */

module.exports = router;