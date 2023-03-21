const mysql = require("mysql");

const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b68ef8cd6aafde",
  password: "51906aea",
  database: "heroku_16d6e6d85b39369",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;

// mysql://b68ef8cd6aafde:51906aea@eu-cdbr-west-03.cleardb.net/heroku_16d6e6d85b39369?
