const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

async function authenticate(username, password) {
    // Buscar o usuário pelo username
    const user = await UserModel.findOne({ username });

    if (!user) {
        // Retorna um erro se o usuário não for encontrado
        return { success: false, message: 'Usuário não encontrado!' };
    }

    // Verificar a senha (compara diretamente, sem criptografia)
    if (user.password !== password) {
        // Retorna um erro se a senha estiver incorreta
        return { success: false, message: 'Senha incorreta!' };
    }

    // Gerar o token JWT
    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Retorna o token se a autenticação for bem-sucedida
    return { success: true, token };
}

module.exports = { authenticate };
