'use strict';

//Requiring npm modules
const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());

//Connecting to local mysql database
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


//Use ejs as template view engine, from view folder
app.set('view engine', 'ejs');

//Setting up middleware for static folder
app.use('/banan', express.static('alma'));


//Check if server can connect to DB
conn.connect((err) => {
  if (err) {
    console.error('Error connecting to DB');
    console.error(err);
    return;
  }
  console.log('DB is connected');
});


//Checked server connection
app.get('/home', (req, res) => {
  res.send('IT\'S ALIVE');
}); 


//Endpoint for listing all the articles
app.get('/articles', (req, res) => {
  conn.query(`
  SELECT
  title,
  url,
  first_name AS firstName,
  last_name AS lastName
  FROM articles ar
  LEFT JOIN authors au
  ON ar.author_id = au.author_id;`, (err, rows) => {
    if (err) {
      res.status(500).send();
      console.error(err);
      return;
    }
    res.json(rows);
  });
});

//Endpoint for searching articles by authors
app.get('/articles/search/:by', (req, res) => {
  const searchBase = req.params.by;
  const searchKey = req.query.filter ? req.query.filter : '';
  console.log('Parameters', req.params);
  console.log('Query', req.query);
  if (searchBase == 'authors'){
    conn.query(`
    SELECT
    title,
    url,
    first_name AS firstName,
    last_name AS lastName
    FROM articles ar
    LEFT JOIN authors au
    ON ar.author_id = au.author_id
    WHERE first_name = '${searchKey}';`, (err, rows) => {
    if (err) {
      res.status(500).send();
      console.error(err);
      return;
    }
    res.render('articles', {rows: rows});
  });
  };
});


//Setting up fülelés
app.listen(PORT, () => {
  console.log(`Server is fülel @ ${PORT}`);
});