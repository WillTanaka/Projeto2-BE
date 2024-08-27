const express = require('express');
const router = express.Router();
const { sucess, fail } = require('../helpers/resposta');
const sessaoService = require('../services/sessaoDAO');
const auth = require('../middlewares/auth');

// Listar sessões
router.get('/', async (req, res) => {
    const { limite = 10, pagina = 1 } = req.query;
    try {
        const sessoes = await sessaoService.list(parseInt(limite), parseInt(pagina));
        res.json(sucess(sessoes, 'list'));
    } catch (error) {
        res.status(500).json(fail('Erro ao listar sessões'));
    }
});

// Buscar sessão por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sessao = await sessaoService.getById(id);
        if (sessao) {
            res.json(sucess(sessao));
        } else {
            res.status(404).json(fail('Sessão não encontrada'));
        }
    } catch (error) {
        res.status(500).json(fail('Erro ao buscar sessão'));
    }
});

// Cadastro de novas sessões
router.post('/', auth, async (req, res) => {
    const { tempo, FilmeId, SalaId } = req.body;
    try {
        const sessao = await sessaoService.save(tempo, FilmeId, SalaId);
        res.status(201).json(sucess(sessao));
    } catch (error) {
        res.status(400).json(fail('Erro ao criar sessão'));
    }
});

// Atualizar dados da sessão
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { tempo, FilmeId, SalaId } = req.body;
    try {
        const sessao = await sessaoService.update(id, tempo, FilmeId, SalaId);
        if (sessao) {
            res.json(sucess(sessao));
        } else {
            res.status(404).json(fail('Sessão não encontrada'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao atualizar sessão'));
    }
});

// Excluir sessão
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sessaoService.delete(id);
        if (result) {
            res.json(sucess(result));
        } else {
            res.status(404).json(fail('Sessão não encontrada'));
        }
    } catch (error) {
        res.status(400).json(fail('Erro ao deletar sessão'));
    }
});

module.exports = router;