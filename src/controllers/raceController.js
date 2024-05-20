const CorridaService = require('../services/raceService');

class CorridaController {
  static criar(req, res) {
    const { usuario_id, origem, destino, valor } = req.body;
    CorridaService.criarCorrida(usuario_id, origem, destino, valor, (err, id) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id });
    });
  }

  static cancelar(req, res) {
    const { id } = req.params;
    CorridaService.cancelarCorrida(id, err => {
      if (err) return res.status(500).json({ error: 'Failed to cancel ride' });
      res.status(200).json({ message: 'Ride canceled' });
    });
  }
}

module.exports = CorridaController;
