const db = require('../database/db');

class Conta {
  static getSaldo(id, callback) {
    db.get('SELECT saldo FROM conta WHERE id = ?', [id], (err, row) => {
      callback(err, row ? row.saldo : null);
    });
  }

  static atualizarSaldo(id, valor, callback) {
    db.run('UPDATE conta SET saldo = saldo + ? WHERE id = ?', [valor, id], function(err) {
      callback(err, this.changes);
    });
  }
}

module.exports = Conta;
