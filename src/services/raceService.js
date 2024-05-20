const Corrida = require('../models/raceModel');
const ContaService = require('./accountService');

class CorridaService {
  static criarCorrida(usuario_id, origem, destino, valor, callback) {
    ContaService.getSaldo(usuario_id, (err, saldo) => {
      if (err) return callback(err);

      if (saldo >= valor) {
        Corrida.create(usuario_id, origem, destino, valor, (err, id) => {
          if (err) return callback(err);

          ContaService.debitar(usuario_id, valor, (err) => {
            if (err) return callback(err);

            callback(null, id);
          });
        });
      } else {
        callback(new Error('Saldo insuficiente'));
      }
    });
  }

  static cancelarCorrida(id, callback) {
    Corrida.cancel(id, callback);
  }
}

module.exports = CorridaService;
