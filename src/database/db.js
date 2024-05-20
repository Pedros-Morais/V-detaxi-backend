const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE conta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    saldo REAL NOT NULL
  )`);

  db.run(`CREATE TABLE corrida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL,
    status TEXT NOT NULL,
    valor REAL NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES conta(id)
  )`);

  db.run(`INSERT INTO conta (saldo) VALUES (100.00)`);
});

module.exports = db;
