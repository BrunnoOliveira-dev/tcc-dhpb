const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");


const Escola = sequelize.define("Escola", {
    id_escola: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    cidade: {
        type: DataTypes.STRING(80),
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
