const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona o usuário decodificado ao objeto `req`
        next(); // Chama o próximo middleware ou a rota
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;