const express = require("express");
const router = express.Router();
const { sucess, fail } = require("../helpers/resposta");
const sessaoDAO = require('../services/sessaoDAO');
//const { sessaoValida } = require('../helpers/validacao.joi');
const auth = require('../middlewares/auth');

// Listar sessões
router.get("/", async (req, res) => {
    const { limite = 5, pagina = 1 } = req.query;
    const validLimites = [5, 10, 30];
    if (!validLimites.includes(parseInt(limite))) {
        return res.status(400).json(fail("Valor de limite inválido"));
    }

    try {
        const sessoes = await sessaoDAO.list(parseInt(limite), parseInt(pagina));
        res.json(sucess(sessoes, "list"));
    } catch (error) {
        res.status(500).json(fail("Erro ao listar sessões"));
    }
});

router.get('/filme-sessoes', async (req, res) => {
    const { filmeId } = req.query;
    if (!filmeId) {
        return res.status(400).json(fail('O parâmetro filmeId é obrigatório.'));
    }
    const sessoes = await sessaoDAO.findByMovie(filmeId);
    if (sessoes.length > 0) {
        res.json(sucess(sessoes, 'sessoes'));
    } else {
        res.status(404).json(fail('Nenhuma sessão encontrada para o filme especificado.'));
    }
});

// Criar sessão
router.post("/", auth, async (req, res) => {
    try {
        const { tempo, FilmeId, SalaId } = req.body;
        const sessao = await sessaoDAO.save(tempo, FilmeId, SalaId);
        if (sessao)
            res.json(sucess(sessao));
        else
            res.status(500).json(fail("Falha ao criar a sessão"));
    } catch (error) {
        res.status(500).json(fail("Erro ao criar sessão"));
    }
});

// Editar sessão
router.put("/:id", auth, async (req, res) => {
    //const { error, value } = sessaoValida.validate(req.body);
    //if (error) return res.status(400).json(fail(error.details[0].message));

    try {
        const { id } = req.params;
        const { tempo, FilmeId, SalaId } = value;
        const updatedSessao = await sessaoDAO.update(id, tempo, FilmeId, SalaId);
        if (updatedSessao)
            res.json(sucess(updatedSessao));
        else
            res.status(500).json(fail("Falha ao editar a sessão"));
    } catch (error) {
        res.status(500).json(fail("Erro ao editar sessão"));
    }
});

// Excluir sessão
router.delete("/:id", auth, async (req, res) => {
    try {
        let result = await sessaoDAO.delete(req.params.id);
        if (result)
            res.json(sucess(result));
        else
            res.status(404).json(fail("Sessão não encontrada"));
    } catch (error) {
        res.status(500).json(fail("Erro ao excluir sessão"));
    }
});

router.get("/sessoes-por-sala", auth, async (req, res) => {
    try {
        const sessoesSalaFilmes = await sessaoDAO.countSessoesSalaFilme();
        res.json(sucess(sessoesSalaFilmes));
    } catch (error) {
        res.status(500).json(fail("Erro ao buscar sessões por sala e filme"));
    }
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
 * /sessoes/filme-sessoes:
 *   get:
 *     summary: Buscar sessões por filme
 *     description: Retorna as sessões de um filme específico.
 *     parameters:
 *       - in: query
 *         name: filmeId
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do filme.
 *     responses:
 *       200:
 *         description: Lista de sessões encontradas.
 *       404:
 *         description: Nenhuma sessão encontrada para o filme especificado.
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