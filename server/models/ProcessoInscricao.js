const { DataTypes } = require('sequelize');
const sequelize = require("../config/config_db");
const Escola = require('./Escola');

const ProcessoInscricao = sequelize.define('ProcessoInscricao', {
  id_processo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo_processo: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true
  },
  id_escola: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Escola,
      key: 'id_escola'
    }
  },
  status: {
    type: DataTypes.ENUM('em_andamento', 'completo'),
    allowNull: false,
    defaultValue: 'em_andamento'
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'processos_inscricao',
  timestamps: false
});

ProcessoInscricao.belongsTo(Escola, { foreignKey: 'id_escola', as: 'Escola' });

module.exports = ProcessoInscricao;
