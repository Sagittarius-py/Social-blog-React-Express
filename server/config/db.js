const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sagittarius-social-db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;

// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "eu-cdbr-west-03.cleardb.net",
//   user: "b68ef8cd6aafde",
//   password: "51906aea",
//   database: "heroku_16d6e6d85b39369",
// });

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// module.exports = db;
