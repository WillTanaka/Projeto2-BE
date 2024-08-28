const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

async function authenticate(username, password) {
    const user = await UserModel.findOne({ username });

    if (!user) {
        return { success: false, message: 'Usuário não encontrado!' };
    }
    if (user.password !== password) {
        return { success: false, message: 'Senha incorreta!' };
    }

    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
    return { success: true, token };
}

module.exports = { authenticate };