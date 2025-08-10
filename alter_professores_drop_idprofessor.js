const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'gondola.proxy.rlwy.net',
  user: 'root',
  password: 'kBZUqKMbHSTcDVdsFzWKrIhXDrhbTPGV',
  database: 'railway',
  port: 36544
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err.message);
    return;
  }
  console.log('Conectado ao banco!');

  // Primeiro remova a foreign key
  const dropFK = "ALTER TABLE professores DROP FOREIGN KEY professores_ibfk_1;";
  connection.query(dropFK, (err, result) => {
    if (err) {
      console.error('Erro ao remover foreign key:', err.message);
      connection.end();
      return;
    }
    console.log('Foreign key removida com sucesso!');

    // Agora remova a coluna
    const dropColumn = "ALTER TABLE professores DROP COLUMN idpessoa;";
    connection.query(dropColumn, (err, result) => {
      if (err) {
        console.error('Erro ao remover coluna:', err.message);
      } else {
        console.log('Coluna idpessoa removida com sucesso!');
      }
      connection.end();
    });
  });
});
