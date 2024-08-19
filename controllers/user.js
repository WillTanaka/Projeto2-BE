const UserModel = require('../models/user');

// Cadastro de novos usuários
async function register(req, res) {
    try {
        const { username, password, email, isAdmin } = req.body;

        const user = await UserModel.create({ username, password, email, isAdmin });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
}

// Alterar dados pessoais do usuário
async function updateUser(req, res) {
    try {
        const { username, email } = req.body;
        const user = await UserModel.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
}

// Criar novos administradores
async function createAdmin(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { username, password, email } = req.body;
        const admin = await UserModel.create({ username, password, email, isAdmin: true });

        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        res.status(400).json({ message: 'Error creating admin', error: error.message });
    }
}

// Excluir um usuário (não administrador)
async function deleteUser(req, res) {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await UserModel.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isAdmin) {
            return res.status(403).json({ message: 'Cannot delete an admin' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
}

module.exports = { register, updateUser, createAdmin, deleteUser };