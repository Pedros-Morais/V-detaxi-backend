const express = require('express');
const CorridaController = require('../controllers/raceController');
const router = express.Router();

router.post('/corrida', CorridaController.criar);
router.patch('/corrida/:id/cancelar', CorridaController.cancelar);

module.exports = router;
