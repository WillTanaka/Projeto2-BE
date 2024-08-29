const express = require("express");
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const connectDB = require('./helpers/database');

const app = express();
app.use(express.json());

connectDB();

const authAPI = require('./controllers/auth');
const userAPI = require('./controllers/userAPI');
const filmeAPI = require('./controllers/filmeAPI');
const salaAPI = require('./controllers/salaAPI');
const sessaoAPI = require('./controllers/sessaoAPI');
const installAPI = require('./controllers/installAPI');
const swaggerDocument = require('./swagger_output.json');

app.use(require('./helpers/database'));
app.use('/auth', authAPI);
app.use('/users', userAPI);
app.use('/filmes', filmeAPI);
app.use('/salas', salaAPI);
app.use('/sessoes', sessaoAPI);
app.use('/install', installAPI);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;