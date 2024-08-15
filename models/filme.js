const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const FilmeModel = sequelize.define("Filme", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = FilmeModel;