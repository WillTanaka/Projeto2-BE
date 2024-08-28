const express = require("express");
const router = express.Router();
const { sucess, fail } = require("../helpers/resposta");
const salaDAO = require('../services/salaDAO');
const auth = require('../middlewares/auth');

// Listar todas as salas
router.get("/", async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;
    const validLimites = [5, 10, 30];
    if (!validLimites.includes(parseInt(limite))) {
        return res.status(400).json(fail("Valor de limite inválido"));
    }

    const salas = await salaDAO.list(parseInt(limite), parseInt(pagina));
    res.json(sucess(salas, "list"));
});

// Criar sala
router.post("/", auth, async (req, res) => {
    const { numero, capacidade } = req.body;
    const sala = await salaDAO.save(numero, capacidade);
    if (sala)
        res.json(sucess(sala));
    else
        res.status(500).json(fail("Falha ao criar a sala"));
});

// Editar sala
router.put("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { numero, capacidade } = req.body;
    const updatedSala = await salaDAO.update(id, numero, capacidade);
    if (updatedSala)
        res.json(sucess(updatedSala));
    else
        res.status(500).json(fail("Falha ao editar a sala"));
});

// Excluir sala
router.delete("/:id", auth, async (req, res) => {
    let result = await salaDAO.delete(req.params.id);
    if (result)
        res.json(sucess(result));
    else
        res.status(500).json(fail("Sala não encontrada"));
});

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Operações relacionadas às salas
 */

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Lista todas as salas com paginação
 *     tags: [Salas]
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
 *         description: Lista de salas
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
 * /salas/{id}:
 *   get:
 *     summary: Busca uma sala pelo ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sala encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Sala não encontrada
 */

/**
 * @swagger
 * /salas:
 *   post:
 *     summary: Cria uma nova sala
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *             required:
 *               - nome
 *               - capacidade
 *     responses:
 *       200:
 *         description: Sala criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao criar a sala
 */

/**
 * @swagger
 * /salas/{id}:
 *   put:
 *     summary: Edita uma sala existente
 *     tags: [Salas]
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
 *               nome:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Falha ao atualizar a sala
 */

/**
 * @swagger
 * /salas/{id}:
 *   delete:
 *     summary: Exclui uma sala pelo ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sala excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Sala não encontrada
 */

module.exports = router;