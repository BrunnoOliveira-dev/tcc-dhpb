const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");  // certifique-se que o caminho está correto
const Equipe = sequelize.define("Equipe", {
  id_equipe: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome_equipe: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  id_professor_lider: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_processo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'processos_inscricao',
      key: 'id_processo'
    }
  }
}, {
  tableName: "equipe",
  timestamps: true,
});


module.exports = Equipe;