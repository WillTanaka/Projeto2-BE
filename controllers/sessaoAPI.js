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

module.exports = router;