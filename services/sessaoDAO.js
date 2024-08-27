const SessaoModel = require('../models/sessao');

module.exports = {
    list: async function(limite = 10, pagina = 1) {
        return await SessaoModel.find()
            .populate('FilmeId')
            .populate('SalaId')
            .limit(limite)
            .skip(limite * (pagina - 1));
    },

    save: async function(tempo, FilmeId, SalaId) {
        const sessao = new SessaoModel({ tempo, FilmeId, SalaId });
        return await sessao.save();
    },

    update: async function(id, tempo, FilmeId, SalaId) {
        const updateData = { tempo, FilmeId, SalaId };
        return await SessaoModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function(id) {
        return await SessaoModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        return await SessaoModel.findById(id)
            .populate('FilmeId')
            .populate('SalaId');
    }
};