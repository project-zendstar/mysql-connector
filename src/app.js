const mysql = require("mysql");
const Constants = require("./constants");

var tableName;

function connect() {
  console.log(`connecting to MySQL host: ${process.env.host}, db name: ${process.env.databaseName}`);
  var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.databaseName
  });
  return connection;
}

module.exports = class MySQLConnector {
  constructor(table) {
    if (table) {
      tableName = table;
    } else {
      throw new Error(Constants.TABLENAME_ERROR);
    }
  }

  createOne(data) {
    if (!data || Array.isArray(data)) {
      throw new Error(Constants.SINGLE_PARAM_ERROR);
    }
    return new Promise(function(resolve, reject) {
      let conn = connect();
      conn.query(`INSERT INTO ${tableName} SET ?`, data, function(error, results, fields) {
        if (error) {
          conn.end(() => {
            console.log("Connection closed from error")
          });
          reject(error);
        }
        resolve(results);
        conn.end(() => {
          console.log("CONNECTION CLOSED from resolve!")
        });
      });
    });
  }

  findOne(data) {
    if (!data || Array.isArray(data)) {
      throw new Error(Constants.SINGLE_PARAM_ERROR);
    }
    return new Promise(function(resolve, reject) {
      let conn = connect();
      conn.query(`SELECT * FROM ${tableName} WHERE ?`, data, function(error, results, fields) {
        if (error) {
          conn.end(() => {
            console.log("Connection closed from error")
          });
          reject(error);
        }
        resolve(results);
        conn.end(() => {
          console.log("CONNECTION CLOSED from resolve!")
        });
      });
    });
  }

  deleteOne(data) {
    if (!data || Array.isArray(data)) {
      throw new Error(Constants.SINGLE_PARAM_ERROR);
    }
    return new Promise(function (resolve, reject) {
      let conn = connect();
      conn.query(`DELETE FROM ${tableName} WHERE ?`, data, function(error, results, fields) {
        if (error) {
          conn.end(() => {
            console.log("Connection closed from error")
          });
          reject(error);
        }
        resolve(results);
        conn.end(() => {
          console.log("CONNECTION CLOSED from resolve!")
        });
      }); 
    })
  }
};
