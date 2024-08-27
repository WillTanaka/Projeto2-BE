const express = require('express');
const authService = require('../services/auth');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.authenticate(username, password);

    if (result.success) {
        res.json({ token: result.token });
    } else {
        res.status(401).json({ message: result.message });
    }
});

module.exports = router;