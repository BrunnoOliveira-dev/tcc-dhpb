const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");

const Pessoa = require("./Pessoa");

const Professor = sequelize.define("Professor", {
id_professor: {
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
disciplina: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
}, {
tableName: "professores",
timestamps: true,
createdAt: "created_at",
updatedAt: "updated_at"
});

Professor.belongsTo(Pessoa, { foreignKey: 'id_pessoa' });


module.exports = Professor;
