// Importing dependencies
require("dotenv").config();
const mysql = require("mysql2/promise");

function dbConnection() {
  return mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: process.env.DB_PASSWORD,
    database: "employees_management_db",
  });
}

module.exports = dbConnection;
