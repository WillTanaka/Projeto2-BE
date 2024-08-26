const UserModel = require('../models/user');

module.exports = {
    list: async function() {
        return await UserModel.find({});
    },

    save: async function(username, password, email, isAdmin = false) {
        const user = new UserModel({ username, password, email, isAdmin });
        return await user.save();
    },

    update: async function(id, username, email, password) {
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function(id) {
        return await UserModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        return await UserModel.findById(id);
    },

    getByUsername: async function(username) {
        return await UserModel.findOne({ username });
    }
};
