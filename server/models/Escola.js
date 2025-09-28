const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");


const Escola = sequelize.define("Escola", {
    id_escola: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo_inep: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    uf: {
        type: DataTypes.CHAR(2),
        allowNull: true,
    },
    municipio: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING(30),
    },
    categoria_administrativa: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    dependencia_administrativa: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: "escola",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = Escola;
