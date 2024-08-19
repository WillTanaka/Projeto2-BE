const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

async function authenticate(username, password) {
    const user = await UserModel.findOne({ where: { username } });
    if (!user || !(await user.validPassword(password))) {
        throw new Error('Usuário ou senha inválida!');
    }

    const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    return token;
}

module.exports = { authenticate };