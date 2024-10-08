const UserModel = require('../models/user');

module.exports = {
    list: async function(limite, pagina) {
        const skip = (pagina - 1) * limite;
        return await UserModel.find({}).limit(limite).skip(skip);
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
    countLogin: async function() {
        
    }
};
