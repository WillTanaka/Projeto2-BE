const express = require('express');
const router = express.Router();
const { sucess, fail } = require('../helpers/resposta');
const salaService = require('../services/salaDAO');
const auth = require('../middlewares/auth');

// Listar salas
router.get('/', async (req, res) => {
    const { limite = 10, pagina = 1 } = req.query;
    try {
        const salas = await salaService.list(parseInt(limite), parseInt(pagina));
        res.json(sucess(salas, 'list'));
    } catch (error) {
        res.status(500).json(fail('Erro ao listar salas'));
    }
});

// Buscar sala por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sala = await salaService.getById(id);
        if (sala) {
            res.json(sucess(sala));
        } else {
            res.status(404).json(fail('Sala não encontrada'));
        }
    } catch (error) {
        res.status(500).json(fail('Erro ao buscar sala'));
    }
});

// Cadastro de novas salas
router.post('/', auth, async (req, res) => {
    const { numero, capacidade } = req.body;
    try {
        const sala = await salaService.save(numero, capacidade);
        res.status(201).json(sucess(sala));
    } catch (error) {
        res.status(400).json(fail('Erro ao criar sala'));
    }
});

// Atualizar dados da sala
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { numero, capacidade } = req.body;
    try {
        const sala = await salaService.update(id, numero, capacidade);
        if (sala) {
            res.json(sucess(sala));
        } else {
            res.status(404).json(fail('Sala não encontrada'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao atualizar sala'));
    }
});

// Excluir sala
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await salaService.delete(id);
        if (result) {
            res.json(sucess(result));
        } else {
            res.status(404).json(fail('Sala não encontrada'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao deletar sala'));
    }
});

module.exports = router;