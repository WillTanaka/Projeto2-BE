const Filme = require('../models/filme');
const Sala = require('../models/sala');
const Sessao = require('../models/sessao');
const User = require('../models/user');

module.exports = {
    install: async function() {
        const filmes = [
            { titulo: 'Cars', genero: 'Animação', ano: 2006 },
            { titulo: 'Cars 2', genero: 'Animação', ano: 2011 },
            { titulo: 'Cars 3', genero: 'Animação', ano: 2017 },
            { titulo: 'The Lion King', genero: 'Animação', ano: 1994 },
            { titulo: 'The Lion King (Live Action)', genero: 'Animação', ano: 2019 }
        ];

        const salas = [
            { numero: 1, capacidade: 100 },
            { numero: 2, capacidade: 150 },
            { numero: 3, capacidade: 200 },
            { numero: 4, capacidade: 250 },
            { numero: 5, capacidade: 300 }
        ];

        const sessoes = [
            { tempo: new Date('2024-08-30T20:00:00Z'), FilmeId: null, SalaId: null },
            { tempo: new Date('2024-08-31T22:00:00Z'), FilmeId: null, SalaId: null },
            { tempo: new Date('2024-09-01T18:00:00Z'), FilmeId: null, SalaId: null },
            { tempo: new Date('2024-09-02T21:00:00Z'), FilmeId: null, SalaId: null },
            { tempo: new Date('2024-09-03T19:00:00Z'), FilmeId: null, SalaId: null }
        ];
        const insertedFilmes = await Filme.insertMany(filmes);
        const insertedSalas = await Sala.insertMany(salas);
        sessoes[0].FilmeId = insertedFilmes[0]._id;
        sessoes[0].SalaId = insertedSalas[0]._id;
        sessoes[1].FilmeId = insertedFilmes[1]._id;
        sessoes[1].SalaId = insertedSalas[1]._id;
        sessoes[2].FilmeId = insertedFilmes[2]._id;
        sessoes[2].SalaId = insertedSalas[2]._id;
        sessoes[3].FilmeId = insertedFilmes[3]._id;
        sessoes[3].SalaId = insertedSalas[3]._id;
        sessoes[4].FilmeId = insertedFilmes[4]._id;
        sessoes[4].SalaId = insertedSalas[4]._id;
        await Sessao.insertMany(sessoes);

        const adminUsername = 'admin';
        const adminPassword = 'admin123';
        const adminEmail = 'admin@bewt.com.br';
        const temAdmin = await User.findOne({ username: adminUsername });
        if (!temAdmin) {
            await User.create({
                username: adminUsername,
                password: adminPassword,
                email: adminEmail,
                isAdmin: true
            });
        }
        return { filmes: insertedFilmes, salas: insertedSalas, sessoes: sessoes, message: 'Dados iniciais inseridos com sucesso!' };
    }
};