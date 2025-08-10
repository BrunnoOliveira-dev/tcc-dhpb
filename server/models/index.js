const sequelize = require("../config/config_db");


const Questao = require("./Questao");
const Alternativa = require("./Alternativa");
const Imagem = require("./Imagem");
const Pessoa = require("./Pessoa");
const Escola = require("./Escola");
const Aluno = require("./Aluno");
const Professor = require("./Professor");

// Definir relacionamentos se necessário
Aluno.belongsTo(Pessoa, { foreignKey: "id_pessoa" });
Aluno.belongsTo(Escola, { foreignKey: "id_escola" });

Professor.belongsTo(Pessoa, { foreignKey: "id_pessoa" });

Alternativa.belongsTo(Questao, { foreignKey: "id_questao" });
Questao.hasMany(Alternativa, { foreignKey: "id_questao" });

Imagem.belongsTo(Questao, { foreignKey: "id_questao" });
Questao.hasMany(Imagem, { foreignKey: "id_questao" });

module.exports = {
	sequelize,
	Questao,
	Alternativa,
	Imagem,
	Pessoa,
	Escola,
	Aluno,
	Professor,
};