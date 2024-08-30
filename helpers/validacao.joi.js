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
module.exports = {
    filmeValida,
    salaValida
};