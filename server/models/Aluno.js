const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");
const Pessoa = require("./Pessoa");
const Escola = require("./Escola");

const Aluno = sequelize.define("Aluno", {
    id_aluno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_escola: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'escola',
            key: 'id_escola'
        }
    },
    id_pessoa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pessoa',
            key: 'id_pessoa'
        }
    },
    esta_em_uma_equipe: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    tableName: "aluno",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

module.exports = Aluno;
