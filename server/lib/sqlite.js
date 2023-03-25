const sqlite3 = require("sqlite3").verbose();

const sqldb = new sqlite3.Database("./server/data/employees.sqlite");

// Helper function to execute SQLite queries
//Per https://stackoverflow.com/questions/64372255/how-to-use-async-await-in-sqlite3-db-get-and-db-all
exports.asyncQuery = function (query, params = []) {
  return new Promise((resolve, reject) => {
    sqldb.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};
