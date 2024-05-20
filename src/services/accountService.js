const Conta = require('../models/accountModel');

class ContaService {
  static getSaldo(id, callback) {
    Conta.getSaldo(id, callback);
  }

  static debitar(id, valor, callback) {
    Conta.atualizarSaldo(id, -valor, callback);
  }

  static creditar(id, valor, callback) {
    Conta.atualizarSaldo(id, valor, callback);
  }
}

module.exports = ContaService;
