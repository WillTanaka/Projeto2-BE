const SalaModel = require('../models/sala');

module.exports = {
    list: async function(limite = 10, pagina = 1) {
        return await SalaModel.find()
            .limit(limite)
            .skip(limite * (pagina - 1));
    },

    save: async function(numero, capacidade) {
        const sala = new SalaModel({ numero, capacidade });
        return await sala.save();
    },

    update: async function(id, numero, capacidade) {
        const updateData = { numero, capacidade };
        return await SalaModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function(id) {
        return await SalaModel.findByIdAndDelete(id);
    },

    getById: async function(id) {
        return await SalaModel.findById(id);
    }
};