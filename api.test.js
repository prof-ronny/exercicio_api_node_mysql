const supertest = require('supertest');
const { app, server, connection } = require('./index.js'); // Importe seu aplicativo Express

var idCriado;

describe('Teste GET /users', () => {
  it('deve responder com status 200', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach(element => {
      expect(element).toHaveProperty("name");

    });


  });
});


describe('Teste Post /users', () => {
  it('deve responder com status 201', async () => {
    const response = await supertest(app).post('/users').send({ name: "Fulano de Tal", email: "fulano@fulano.com" });
    expect(response.statusCode).toBe(201);
    console.log(response.body);
    idCriado = response.body.id;
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBeGreaterThan(0);
    console.log("O id criado foi " + response.body.id);

  });
});


describe('Atualiza usuario Put /users', () => {
  it('deve responder com status 204', async () => {
    const response = await supertest(app).put('/users/1').send({ name: "Beltrano de Tal", email: "fulano@fulano.com" });
    expect(response.statusCode).toBe(204);
  });
});

describe('Deleta usuario  /users', () => {
  it('deve responder com status 204', async () => {
    const response = await supertest(app).delete('/users/'+ idCriado);
    expect(response.statusCode).toBe(204);
  });
});

afterAll(() => {
  server.close();
  connection.end();
});