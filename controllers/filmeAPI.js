const express = require("express");
const router = express.Router();
const { sucess, fail } = require("../helpers/resposta");
const filmeDAO = require('../services/filmeDAO');
const auth = require('../middlewares/auth');

// Listar filmes
router.get("/", async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;
    const validLimites = [5, 10, 30];
    if (!validLimites.includes(parseInt(limite))) {
        return res.status(400).json(fail("Valor de limite inválido"));
    }

    const filmes = await filmeDAO.list(parseInt(limite), parseInt(pagina));
    res.json(sucess(filmes, "list"));
});

// Criar filmes
router.post("/", auth, async (req, res) => {
    const { titulo, genero, ano } = req.body;
    const filme = await filmeDAO.save(titulo, genero, ano);
    if (filme)
        res.json(sucess(filme));
    else
        res.status(500).json(fail("Falha ao criar o filme"));
});

// Editar filme
router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { titulo, genero, ano } = req.body;
    const updatedFilme = await filmeDAO.update(id, titulo, genero, ano);
    if (updatedFilme)
        res.json(sucess(updatedFilme));
    else
        res.status(500).json(fail("Falha ao editar o filme"));
});

// Excluir filme
router.delete("/:id", auth, async (req, res) => {
    let result = await filmeDAO.delete(req.params.id);
    if (result)
        res.json(sucess(result));
    else
        res.status(500).json(fail("Filme não encontrado"));
});

/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Operações relacionadas aos filmes
 */

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Lista todos os filmes com paginação
 *     tags: [Filmes]
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
 *         description: Lista de filmes
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
 * /filmes/{id}:
 *   get:
 *     summary: Busca um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Filme não encontrado
 */

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               ano:
 *                 type: integer
 *             required:
 *               - titulo
 *               - genero
 *               - ano
 *     responses:
 *       200:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao criar o filme
 */

/**
 * @swagger
 * /filmes/{id}:
 *   put:
 *     summary: Edita um filme existente
 *     tags: [Filmes]
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
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               ano:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao atualizar o filme
 */

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Exclui um filme pelo ID
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Filme não encontrado
 */

module.exports = router;