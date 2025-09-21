const Sequelize = require('sequelize');

// mysql://root:kBZUqKMbHSTcDVdsFzWKrIhXDrhbTPGV@gondola.proxy.rlwy.net:36544/railway

const db_name = 'railway';
const db_user = 'root';
const db_password = "YeFCsUgWbIiujIuYxhvEQPQhPtoJZVNc" //'kBZUqKMbHSTcDVdsFzWKrIhXDrhbTPGV';
const db_host = "centerbeam.proxy.rlwy.net" //'gondola.proxy.rlwy.net';
const db_dialect = 'mysql'; // ou 'postgres', 'sqlite', etc.
const db_port = 56054; // Porta padrão do MySQL

const sequelize = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    dialect: db_dialect,
    port: db_port,
    logging: false,
});


async function testConection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso!');

    // Importa todos os modelos
    const { Questao, Alternativa, Imagem, Escola, Pessoa, Aluno, Professor } = require('../models');

    // Sincroniza todos os modelos, atualizando tabelas existentes
    await Questao.sync({ alter: true });
    await Alternativa.sync({ alter: true });
    await Imagem.sync({ alter: true });
    await Escola.sync({ alter: true });
    await Pessoa.sync({ alter: true });
    await Aluno.sync({ alter: true });
    await Professor.sync({ alter: true });

    console.log('Tabelas sincronizadas/atualizadas com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConection();

module.exports = sequelize;



