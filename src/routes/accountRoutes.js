const express = require('express');
const ContaController = require('../controllers/accountController');
const router = express.Router();

router.get('/conta/:id/saldo', ContaController.getSaldo);

module.exports = router;
