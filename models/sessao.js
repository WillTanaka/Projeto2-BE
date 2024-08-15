const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");
const FilmeModel = require("./filme");
const SalaModel = require("./sala");

const SessaoModel = sequelize.define("Sessao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tempo: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    FilmeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    SalaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

SessaoModel.belongsTo(FilmeModel, {
    foreignKey: 'FilmeId'
});
FilmeModel.hasMany(SessaoModel, { 
    foreignKey: 'FilmeId' 
});

SessaoModel.belongsTo(SalaModel, {
    foreignKey: 'SalaId'
});
SalaModel.hasMany(SessaoModel, { 
    foreignKey: 'SalaId' 
});

module.exports = SessaoModel;