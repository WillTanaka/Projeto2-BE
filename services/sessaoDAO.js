const SessaoModel = require('../models/sessao');

module.exports = {
    list: async function(limite, pagina) {
        const limit = parseInt(limite);
        const skip = (pagina - 1) * limit;
        return await SessaoModel.find({})
            .populate('FilmeId', 'titulo')
            .populate('SalaId', 'numero')
            .limit(limit)
            .skip(skip);
    },

    save: async function(tempo, FilmeId, SalaId) {
        const sessao = new SessaoModel({ tempo, FilmeId, SalaId });
        return await sessao.save();
    },

    update: async function(id, tempo, FilmeId, SalaId) {
        const updateData = {};
        if (tempo) updateData.tempo = tempo;
        if (FilmeId) updateData.FilmeId = FilmeId;
        if (SalaId) updateData.SalaId = SalaId;

        return await SessaoModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function(id) {
        return await SessaoModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        return await SessaoModel.findById(id)
            .populate('FilmeId', 'titulo')
            .populate('SalaId', 'numero');
    },

    findByMovie: async function(filmeId) {
        return await SessaoModel.find({ FilmeId: filmeId })
        .populate('FilmeId', 'titulo')
        .populate('SalaId', 'numero');
    }
};