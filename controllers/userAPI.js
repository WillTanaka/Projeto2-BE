const express = require("express");
const router = express.Router();
const { sucess, fail } = require("../helpers/resposta");
const userDAO = require('../services/userDAO');
const auth = require('../middlewares/auth');

// Listar todos os usuários ou apenas usuários não administradores
router.get("/", async (req, res) => {
    let users;
    users = await userDAO.list();
    res.json(sucess(users, "list"));
});

// Buscar usuário por ID
router.get("/:id", auth, async (req, res) => {
    let user = await userDAO.getById(req.params.id);
    if (user)
        res.json(sucess(user));
    else 
        res.status(500).json(fail("Usuário não encontrado"));
});

// Cadastro de novos usuários
router.post("/", async (req, res) => {
    const { username, password, email } = req.body;

    // TODO: Validar os campos

    let user = await userDAO.save(username, password, email);
    if (user)
        res.json(sucess(user));
    else 
        res.status(500).json(fail("Falha ao salvar o novo usuário"));
});

// Atualizar dados do usuário
router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    
    // Verifica se o usuário está tentando atualizar a si mesmo ou se é um administrador
    if (req.user.isAdmin || req.user.id === id) {
        // Atualiza o usuário
        let updatedUser = await userDAO.update(id, username, email, password);
        if (updatedUser)
            res.json(sucess(updatedUser));
        else
            res.status(500).json(fail("Falha ao alterar o usuário"));
    } else {
        res.status(403).json(fail("Acesso negado"));
    }
});

// Excluir usuário (apenas administradores podem)
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

module.exports = router;