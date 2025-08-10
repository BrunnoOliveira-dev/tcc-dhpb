const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");
const Questao = require("./Questao");

const Alternativa = sequelize.define("Alternativa", {
  id_alternativa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  texto: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  pontuacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_questao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'questoes',
      key: 'id_questao'
    }
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
  tableName: "alternativa",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

Alternativa.belongsTo(Questao, { foreignKey: 'id_questao' });
Questao.hasMany(Alternativa, { foreignKey: 'id_questao' });

module.exports = Alternativa;
