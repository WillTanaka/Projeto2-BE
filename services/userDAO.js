const { Op } = require("sequelize");
const userModel = require('../models/user');

module.exports = {
    list: async function() {
        const users = await userModel.findAll();
        return users;
    },
    
    save: async function(username, password, email, isAdmin = false) {
        const user = await userModel.create({
            username: username,
            password: password,
            email: email,
            isAdmin: isAdmin
        });
        return user;
    },

    update: async function(id, username, email) {
        return await userModel.update({username, email}, {
            where: { id: id }
        });
    },

    delete: async function(id) {
        return await userModel.destroy({where: { id: id }});
    },

    getById: async function(id) {
        return await userModel.findByPk(id);
    },

    getByUsername: async function(username) {
        return await userModel.findOne({
            where: {username: {[Op.like]: '%' + username + '%'}}
        });
    }
};