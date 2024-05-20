const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const contaRoutes = require('../routes/accountRoutes');
const db = require('../database/db');

const app = express();
app.use(bodyParser.json());
app.use('/api', contaRoutes);

describe('Conta API', () => {
  beforeAll(done => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS conta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        saldo REAL NOT NULL
      )`);
      db.run(`INSERT INTO conta (saldo) VALUES (100.00)`, done);
    });
  });

  afterAll(done => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS conta`, done);
    });
  });

  it('deve retornar o saldo da conta', done => {
    request(app)
      .get('/api/conta/1/saldo')
      .expect(200)
      .expect(res => {
        expect(res.body.saldo).toBe(100.00);
      })
      .end(done);
  });
});
