const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const SalaModel = sequelize.define("Sala", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = SalaModel;