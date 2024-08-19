require("dotenv").config({path: `${process.cwd()}/.env`});
const sequelize = require('./helpers/database'); // Ajuste o caminho conforme necessário

sequelize.authenticate()
    .then(() => {
        console.log("Conectado no " + process.env.DB_DIALECT + "!");
    })
    .catch(error => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });
