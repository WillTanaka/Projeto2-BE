const Joi = require('joi');

const filmeValida = Joi.object({
    titulo: Joi.string()
        .messages({
            'string.base': '"titulo" deve ser um texto',
        }),
    genero: Joi.string()
        .messages({
            'string.base': '"genero" deve ser um texto',
        }),
    ano: Joi.number()
        .integer()
        .messages({
            'number.base': '"ano" deve ser um número',
            'number.integer': '"ano" deve ser um número inteiro',
        })
});

const salaValida = Joi.object({
    numero: Joi.number()
        .integer()
        .messages({
            'number.base': '"numero" deve ser um número',
            'number.integer': '"numero" deve ser um número inteiro'
        }),
    capacidade: Joi.number()
        .integer()
        .messages({
            'number.base': '"capacidade" deve ser um número',
            'number.integer': '"capacidade" deve ser um número inteiro'
        })
});

const sessaoValida = Joi.object({
    tempo: Joi.string()
        .messages({
            'string.base': '"tempo" deve ser um texto'
        }),
    FilmeId: Joi.number()
        .integer()
        .messages({
            'number.base': '"FilmeId" deve ser um número do id que pode pegar no http://localhost:3000/filmes?limite=5&pagina=1',
            'number.integer': '"FilmeId" deve ser um número inteiro'
        }),
    SalaId: Joi.number()
        .integer()
        .messages({
            'number.base': '"SalaId" deve ser um número do id que pode pegar no http://localhost:3000/salas?limite=5&pagina=1',
            'number.integer': '"SalaId" deve ser um número inteiro'
        })
});

module.exports = {
    filmeValida,
    salaValida,
    sessaoValida
};