const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");
const Questao = require("./Questao");

const Imagem = sequelize.define("Imagem", {
  id_imagem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_questao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'questoes',
      key: 'id_questao'
    }
  },
  link_imagem: {
    type: DataTypes.STRING(500),
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
  tableName: "imagens",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Imagem;
