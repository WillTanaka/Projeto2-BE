const SalaModel = require('../models/sala');

module.exports = {
    list: async function (limite, pagina) {
        const skip = (pagina - 1) * limite;
        return await SalaModel.find({}).limit(limite).skip(skip);
    },

    save: async function (numero, capacidade) {
        const sala = new SalaModel({ numero, capacidade });
        return await sala.save();
    },

    update: async function (id, numero, capacidade) {
        const updateData = {};
        if (numero) updateData.numero = numero;
        if (capacidade) updateData.capacidade = capacidade;

        return await SalaModel.findByIdAndUpdate(id, updateData, { new: true });
    },

    delete: async function (id) {
        return await SalaModel.findByIdAndDelete(id);
    }
};