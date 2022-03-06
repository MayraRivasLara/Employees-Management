require('dotenv').config();

// import mysql2
const mysql= require('mysql2/promise');

// create a helper function to connect to database
function connectDatabase(){
    // create the connection
    return mysql.createConnection({
       host: process.env.DB_HOST, 
       user: process.env.DB_USER, 
       port: process.env.DB_PORT,
       password: process.env.DB_PASSWORD,
       database: "employees_management_db"
    });
}

module.exports= {connectDatabase};
