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
id_pessoa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'pessoas',
        key: 'id_pessoa'
    }
},
id_escola: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'escolas',
        key: 'id_escola'
    }
},
matricula: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
},
}, {
tableName: "alunos",
timestamps: true,
createdAt: "created_at",
updatedAt: "updated_at"
});

Aluno.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });
Aluno.belongsTo(Escola, { foreignKey: 'id_escola' });

module.exports = Aluno;
