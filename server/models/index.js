const sequelize = require("../config/config_db");

const Pessoa = require("./Pessoa");
const Escola = require("./Escola");
const Aluno = require("./Aluno");
const Professor = require("./Professor");

// Definir relacionamentos se necessário
Aluno.belongsTo(Pessoa, { foreignKey: "id_pessoa" });
Aluno.belongsTo(Escola, { foreignKey: "id_escola" });

Professor.belongsTo(Pessoa, { foreignKey: "idpessoa" });

module.exports = {
sequelize,
Pessoa,
Escola,
Aluno,
Professor,
};