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

// Buscar filme por id
router.get("/:id", auth, async (req, res) => {
    let filme = await filmeDAO.getById(req.params.id);
    if (filme)
        res.json(sucess(filme));
    else 
        res.status(500).json(fail("Filme não encontrado"));
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

module.exports = router;