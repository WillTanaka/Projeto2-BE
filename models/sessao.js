const mongoose = require('mongoose');

const SessaoSchema = new mongoose.Schema({
    tempo: { type: Date, required: true },
    FilmeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Filme', required: true },
    SalaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
});

module.exports = mongoose.model('Sessao', SessaoSchema);