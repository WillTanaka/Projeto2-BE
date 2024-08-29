const SessaoModel = require('../models/sessao');

module.exports = {
    list: async function(limite, pagina) {
        const skip = (pagina - 1) * limite;
        return await SessaoModel.find({})
            .populate('FilmeId', 'titulo')
            .populate('SalaId', 'numero')
            .limit(limite)
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
    },
    // retornar quantas sessoes por sala e quais os filmes
    countSessoesSalaFilme: async function() {
        const sessoes = await SessaoModel.find({})
            .populate('FilmeId', 'titulo')
            .populate('SalaId', 'numero');

        const resultado = {};

        sessoes.forEach(sessao => {
            const salaId = sessao.SalaId._id;
            const filmeTitulo = sessao.FilmeId.titulo;

            if (!resultado[salaId]) {
                resultado[salaId] = {
                    sala: sessao.SalaId.numero,
                    totalSessoes: 0,
                    filmes: []
                };
            }
            resultado[salaId].totalSessoes += 1;

            if (!resultado[salaId].filmes.includes(filmeTitulo)) {
                resultado[salaId].filmes.push(filmeTitulo);
            }
        });
        return resultado;
        //{sala: 1, totalSessoes: 3, filmes: ['Cars 1', 'Cars 2']},
    }
}