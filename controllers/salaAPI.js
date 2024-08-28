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

// Buscar sala por id
router.get("/:id", auth, async (req, res) => {
    let sala = await salaDAO.getById(req.params.id);
    if (sala)
        res.json(sucess(sala));
    else 
        res.status(500).json(fail("Sala não encontrada"));
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

module.exports = router;