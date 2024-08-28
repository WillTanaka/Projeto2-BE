const express = require("express");
const router = express.Router();
const { sucess, fail } = require("../helpers/resposta");
const sessaoDAO = require('../services/sessaoDAO');
const auth = require('../middlewares/auth');

// Listar sessoes
router.get("/", async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;
    const validLimites = [5, 10, 30];
    if (!validLimites.includes(parseInt(limite))) {
        return res.status(400).json(fail("Valor de limite inválido"));
    }

    const sessoes = await sessaoDAO.list(parseInt(limite), parseInt(pagina));
    res.json(sucess(sessoes, "list"));
});

// Rota especial - listar sessoes por filme
router.get('/filme-sessoes', async (req, res) => {
    const { filmeId } = req.query;
    if (!filmeId) {
        return res.status(400).json(fail('Parâmetro "filmeId" é obrigatório'));
    }
    const sessoes = await sessaoDAO.findByMovie(filmeId);
    res.json(sucess(sessoes, "Sessões por filme"));
});

// Buscar sessao
router.get("/:id", auth, async (req, res) => {
    let sessao = await sessaoDAO.getById(req.params.id);
    if (sessao)
        res.json(sucess(sessao));
    else 
        res.status(500).json(fail("Sessão não encontrada"));
});

// Criar sessao
router.post("/", auth, async (req, res) => {
    const { tempo, FilmeId, SalaId } = req.body;
    const sessao = await sessaoDAO.save(tempo, FilmeId, SalaId);
    if (sessao)
        res.json(sucess(sessao));
    else
        res.status(500).json(fail("Falha ao criar a sessão"));
});

// Editar sessao
router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { tempo, FilmeId, SalaId } = req.body;
    const updatedSessao = await sessaoDAO.update(id, tempo, FilmeId, SalaId);
    if (updatedSessao)
        res.json(sucess(updatedSessao));
    else
        res.status(500).json(fail("Falha ao editar a sessão"));
});

// Excluir sessao
router.delete("/:id", auth, async (req, res) => {
    let result = await sessaoDAO.delete(req.params.id);
    if (result)
        res.json(sucess(result));
    else
        res.status(500).json(fail("Sessão não encontrada"));
});

/**
 * @swagger
 * tags:
 *   name: Sessões
 *   description: Operações relacionadas às sessões
 */

/**
 * @swagger
 * /sessoes:
 *   get:
 *     summary: Lista todas as sessões com paginação
 *     tags: [Sessões]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 5
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Lista de sessões
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Valor de limite inválido
 */

/**
 * @swagger
 * /sessoes/{id}:
 *   get:
 *     summary: Busca uma sessão pelo ID
 *     tags: [Sessões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sessão encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Sessão não encontrada
 */

/**
 * @swagger
 * /sessoes:
 *   post:
 *     summary: Cria uma nova sessão
 *     tags: [Sessões]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmeId:
 *                 type: string
 *               salaId:
 *                 type: string
 *               horario:
 *                 type: string
 *               data:
 *                 type: string
 *             required:
 *               - filmeId
 *               - salaId
 *               - horario
 *               - data
 *     responses:
 *       200:
 *         description: Sessão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao criar a sessão
 */

/**
 * @swagger
 * /sessoes/{id}:
 *   put:
 *     summary: Edita uma sessão existente
 *     tags: [Sessões]
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
 *               filmeId:
 *                 type: string
 *               salaId:
 *                 type: string
 *               horario:
 *                 type: string
 *               data:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sessão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao atualizar a sessão
 */

/**
 * @swagger
 * /sessoes/{id}:
 *   delete:
 *     summary: Exclui uma sessão pelo ID
 *     tags: [Sessões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sessão excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Sessão não encontrada
 */

module.exports = router;