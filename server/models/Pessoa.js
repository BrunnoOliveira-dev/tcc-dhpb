const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");  // certifique-se que o caminho está correto


const Pessoa = sequelize.define("Pessoa", {
  id_pessoa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  cpf: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    unique: true,
  },
  endereco: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  senha: {
    type: DataTypes.STRING(60),
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
  tableName: "pessoa",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Pessoa;
