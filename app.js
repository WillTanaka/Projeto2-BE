const express = require('express');
const path = require('path');
require("dotenv").config()

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

module.exports = app;