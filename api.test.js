const supertest = require('supertest');
const {app, server, connection} = require('./index.js'); // Importe seu aplicativo Express

describe('Teste GET /users', () => {
  it('deve responder com status 200', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});


describe('Teste Post /users', () => {
  it('deve responder com status 201', async () => {
    const response = await supertest(app).post('/users').send({name:"Fulano de Tal", email:"fulano@fulano.com"});
    expect(response.statusCode).toBe(201);
  });
});

afterAll(() => {
  server.close();
  connection.end();
});