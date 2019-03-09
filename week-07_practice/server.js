'use strict';

const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
})