const express = require('express');
const bodyParser = require('body-parser');
const corridaRoutes = require('./src/routes/raceRoutes');
const contaRoutes = require('./src/routes/accountRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', corridaRoutes);
app.use('/api', contaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
