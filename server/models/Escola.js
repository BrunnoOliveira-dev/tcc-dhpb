const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");

const Escola = sequelize.define("Escola", {
id_escola: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
nome_escola: {
    type: DataTypes.STRING(150),
    allowNull: false,
},
endereco: {
    type: DataTypes.STRING(200),
    allowNull: false,
},
}, {
tableName: "escolas",
timestamps: false,
});

module.exports = Escola;
