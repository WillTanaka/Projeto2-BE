const express = require('express');
const router = express.Router();
const { sucess, fail } = require('../helpers/resposta');
const installDAO = require('../services/installDAO');

// Instalar dados iniciais
router.get('/', async (req, res) => {
    const install = await installDAO.install();
    if (install) {
        res.json(sucess(install, 'Dados iniciais inseridos com sucesso!'));
    } else {
        res.status(500).json(fail('Falha ao inserir dados iniciais!'));
    }
});

module.exports = router;