const authService = require('../services/auth');

async function login(req, res) {
    const { username, password } = req.body;
    const result = await authService.authenticate(username, password);

    if (result.success) {
        res.json({ token: result.token });
    } else {
        res.status(401).json({ message: result.message });
    }
}

module.exports = { login };