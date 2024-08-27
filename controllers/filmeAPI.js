const express = require('express');
const router = express.Router();
const { sucess, fail } = require('../helpers/resposta');
const filmeService = require('../services/filmeDAO');
const auth = require('../middlewares/auth');

// Listar filmes
router.get('/', async (req, res) => {
    const { limite = 10, pagina = 1 } = req.query;
    try {
        const filmes = await filmeService.list(parseInt(limite), parseInt(pagina));
        res.json(sucess(filmes, 'list'));
    } catch (error) {
        res.status(500).json(fail('Erro ao listar filmes'));
    }
});

// Buscar filme por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const filme = await filmeService.getById(id);
        if (filme) {
            res.json(sucess(filme));
        } else {
            res.status(404).json(fail('Filme não encontrado'));
        }
    } catch (error) {
        res.status(500).json(fail('Erro ao buscar filme'));
    }
});

// Cadastro de novos filmes
router.post('/', auth, async (req, res) => {
    const { titulo, genero, ano } = req.body;
    try {
        const filme = await filmeService.save(titulo, genero, ano);
        res.status(201).json(sucess(filme));
    } catch (error) {
        res.status(400).json(fail('Erro ao criar filme'));
    }
});

// Atualizar dados do filme
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { titulo, genero, ano } = req.body;
    try {
        const filme = await filmeService.update(id, titulo, genero, ano);
        if (filme) {
            res.json(sucess(filme));
        } else {
            res.status(404).json(fail('Filme não encontrado'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao atualizar filme'));
    }
});

// Excluir filme
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await filmeService.delete(id);
        if (result) {
            res.json(sucess(result));
        } else {
            res.status(404).json(fail('Filme não encontrado'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao deletar filme'));
    }
});

module.exports = router;