require("dotenv").config({path: `${process.cwd()}/.env`});
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index');
const auth = require('./routes/auth');
const user = require('./routes/user');
const UserModel = require('./models/filme');

app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/users', user);

module.exports = app;