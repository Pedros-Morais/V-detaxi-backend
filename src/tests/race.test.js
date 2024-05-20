const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const corridaRoutes = require('../routes/raceRoutes');
const contaRoutes = require('../routes/accountRoutes');
const db = require('../database/db');

const app = express();
app.use(bodyParser.json());
app.use('/api', corridaRoutes);
app.use('/api', contaRoutes);

describe('Corrida API', () => {
  beforeAll(done => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS conta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        saldo REAL NOT NULL
      )`);
      db.run(`CREATE TABLE IF NOT EXISTS corrida (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        origem TEXT NOT NULL,
        destino TEXT NOT NULL,
        status TEXT NOT NULL,
        valor REAL NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES conta(id)
      )`);
      db.run(`INSERT INTO conta (saldo) VALUES (100.00)`, done);
    });
  });

  afterAll(done => {
    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS corrida`, () => {
        db.run(`DROP TABLE IF EXISTS conta`, done);
      });
    });
  });

  it('deve criar uma nova corrida se o saldo for suficiente', done => {
    request(app)
      .post('/api/corrida')
      .send({ usuario_id: 1, origem: 'A', destino: 'B', valor: 20.00 })
      .expect(201)
      .expect(res => {
        expect(res.body.id).toBeDefined();
      })
      .end(done);
  });

  it('não deve criar uma nova corrida se o saldo for insuficiente', done => {
    request(app)
      .post('/api/corrida')
      .send({ usuario_id: 1, origem: 'A', destino: 'B', valor: 200.00 })
      .expect(500)
      .expect(res => {
        expect(res.body.error).toBe('Saldo insuficiente');
      })
      .end(done);
  });

  it('deve cancelar uma corrida', done => {
    db.run('INSERT INTO corrida (usuario_id, origem, destino, status, valor) VALUES (1, "A", "B", "ativa", 20.00)', function() {
      const id = this.lastID;
      request(app)
        .patch(`/api/corrida/${id}/cancelar`)
        .expect(200)
        .expect(res => {
          expect(res.body.message).toBe('Ride canceled');
        })
        .end(done);
    });
  });
});
