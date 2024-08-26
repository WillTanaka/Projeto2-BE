const express = require("express")
const path = require("path")
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index');
const auth = require('./routes/auth');
const user = require('./controllers/userAPI');

app.use(require('./helpers/database'))

app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/users', user);

module.exports = app;