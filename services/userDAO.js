const UserModel = require('../models/user');

module.exports = {
    list: async function() {
        // Encontrar todos os usuários
        return await UserModel.find();
    },
    
    save: async function(username, password, email, isAdmin = false) {
        // Criar um novo usuário
        const user = new UserModel({
            username: username,
            password: password,
            email: email,
            isAdmin: isAdmin
        });
        return await user.save();
    },

    update: async function(id, username, email) {
        // Atualizar um usuário existente
        return await UserModel.findByIdAndUpdate(id, { username, email }, { new: true });
    },

    delete: async function(id) {
        // Excluir um usuário
        return await UserModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        // Encontrar um usuário por ID
        return await UserModel.findById(id);
    },

    getByUsername: async function(username) {
        // Encontrar um usuário por username
        return await UserModel.findOne({ username });
    }
};