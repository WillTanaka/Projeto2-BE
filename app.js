const express = require("express");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const authAPI = require('./controllers/auth');
const userAPI = require('./controllers/userAPI');
const filmeAPI = require('./controllers/filmeAPI');
const salaAPI = require('./controllers/salaAPI');
const sessaoAPI = require('./controllers/sessaoAPI');

app.use(require('./helpers/database'));

app.use('/auth', authAPI);
app.use('/users', userAPI);
app.use('/filmes', filmeAPI);
app.use('/salas', salaAPI);
app.use('/sessoes', sessaoAPI);

module.exports = app;