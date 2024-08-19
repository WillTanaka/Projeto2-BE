const authService = require('../services/auth');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const token = await authService.authenticate(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

module.exports = { login };