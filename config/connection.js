// mysql database
// import
const mysql = require("mysql2");
// mysql.createConnection

const db = mysql.createConnection(
  //creating the connection object
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "department_db",
  },
  console.log("Connected to the database!")
);

module.exports = db;
