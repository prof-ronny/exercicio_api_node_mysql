const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER || "root", // Usa variáveis de ambiente
  password: process.env.MYSQL_PASSWORD || "mamae123",
  database: process.env.MYSQL_DATABASE || "usersdb"

});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());

// Rotas CRUD

// Criar usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const INSERT_USER_QUERY = `INSERT INTO users (name, email) VALUES (?, ?)`;
  connection.query(INSERT_USER_QUERY, [name, email], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.statusCode=201;
    
    res.send({id:results.insertId});
  
  });
});

// Obter todos os usuários
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const SELECT_USER_QUERY = `SELECT * FROM users WHERE id = ?`;
  connection.query(SELECT_USER_QUERY, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;

  const { name, email } = req.body;

  const UPDATE_USER_QUERY = `Update users set name=?, email=? WHERE id = ?`;
  connection.query(UPDATE_USER_QUERY,  [name, email, userId], (err, results) => {
    if (err) throw err;
    res.statusCode=204;
    res.json(results);
  });
});


app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const DELETE_USER_QUERY = `Delete FROM users WHERE id = ?`;
  connection.query(DELETE_USER_QUERY, [userId], (err, results) => {
    if (err) throw err;
    res.statusCode=204;
    res.json(results);
  });
});



// Iniciar o servidor
const server= app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = {app, server ,connection} ;