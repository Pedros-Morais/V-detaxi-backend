const db = require('../database/db');

class Corrida {
  static create(usuario_id, origem, destino, valor, callback) {
    const stmt = db.prepare('INSERT INTO corrida (usuario_id, origem, destino, status, valor) VALUES (?, ?, ?, ?, ?)');
    stmt.run(usuario_id, origem, destino, 'ativa', valor, function(err) {
      callback(err, this.lastID);
    });
    stmt.finalize();
  }

  static cancel(id, callback) {
    const stmt = db.prepare('UPDATE corrida SET status = ? WHERE id = ?');
    stmt.run('cancelada', id, function(err) {
      callback(err);
    });
    stmt.finalize();
  }
}

module.exports = Corrida;
