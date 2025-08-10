const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");

const Questao = sequelize.define("Questao", {
  id_questao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  texto: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  enunciado: {
    type: DataTypes.STRING(255),
    allowNull: false,
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
  tableName: "questoes",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Questao;
