const FilmeModel = require('../models/filme');

module.exports = {
    list: async function (limite, pagina) {
        const skip = (pagina - 1) * limite;
        return await FilmeModel.find({}).limit(limite).skip(skip);
    },

    save: async function (titulo, genero, ano) {
        const filme = new FilmeModel({ titulo, genero, ano });
        return await filme.save();
    },

    update: async function (id, titulo, genero, ano) {
        const updateData = {};
        if (titulo) updateData.titulo = titulo;
        if (genero) updateData.genero = genero;
        if (ano) updateData.ano = ano;

        return await FilmeModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function (id) {
        return await FilmeModel.findByIdAndDelete(id);
    }
};