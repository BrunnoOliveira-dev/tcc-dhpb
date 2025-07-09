const Sequelize = require('sequelize');

// mysql://root:kBZUqKMbHSTcDVdsFzWKrIhXDrhbTPGV@gondola.proxy.rlwy.net:36544/railway

const db_name = 'railway';
const db_user = 'root';
const db_password = 'kBZUqKMbHSTcDVdsFzWKrIhXDrhbTPGV';
const db_host = 'gondola.proxy.rlwy.net';
const db_dialect = 'mysql'; // ou 'postgres', 'sqlite', etc.
const db_port = 36544; // Porta padrão do MySQL

const sequelize = new Sequelize(db_name, db_user, db_password, {
    host: db_host,
    dialect: db_dialect,
    port: db_port,
});

function testConection() {
    (async () => {
        try {
          await sequelize.authenticate();
          console.log('Conexão estabelecida com sucesso!');
          // Cria as tabelas automaticamente conforme os modelos definidos
          await sequelize.sync();
          console.log('Tabelas sincronizadas com sucesso!');
        } catch (error) {
          console.error('Não foi possível conectar ao banco de dados:', error);
        }
    })();
}

testConection()

module.exports = sequelize;



