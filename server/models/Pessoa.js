const { DataTypes } = require("sequelize");
const sequelize = require("../config/config_db");  // certifique-se que o caminho está correto

const Pessoa = sequelize.define("Pessoa", {
  id_pessoa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_pessoa: {
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
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
}, {
  tableName: "pessoas",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

module.exports = Pessoa;
