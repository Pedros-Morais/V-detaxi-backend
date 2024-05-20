const ContaService = require('../services/accountService');

class ContaController {
  static getSaldo(req, res) {
    const { id } = req.params;
    ContaService.getSaldo(id, (err, saldo) => {
      if (err) return res.status(500).json({ error: 'Failed to get balance' });
      res.status(200).json({ saldo });
    });
  }
}

module.exports = ContaController;
