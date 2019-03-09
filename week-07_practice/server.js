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