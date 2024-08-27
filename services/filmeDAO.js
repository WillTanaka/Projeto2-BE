const FilmeModel = require('../models/filme');

module.exports = {
    list: async function(limite = 10, pagina = 1) {
        return await FilmeModel.find()
            .limit(limite)
            .skip(limite * (pagina - 1));
    },

    save: async function(titulo, genero, ano) {
        const filme = new FilmeModel({ titulo, genero, ano });
        return await filme.save();
    },

    update: async function(id, titulo, genero, ano) {
        const updateData = { titulo, genero, ano };
        return await FilmeModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function(id) {
        return await FilmeModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        return await FilmeModel.findById(id);
    }
};