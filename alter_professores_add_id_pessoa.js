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

  const sql = "ALTER TABLE professores ADD COLUMN id_pessoa INT NOT NULL;";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao alterar tabela:', err.message);
    } else {
      console.log('Coluna id_pessoa adicionada com sucesso!');
    }
    connection.end();
  });
});
