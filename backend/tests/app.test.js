const request = require('supertest');
const app = require('../app'); // Supondo que o arquivo principal seja app.js
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Client = require('../models/clientModel');

// Limpar o banco de dados antes de cada teste
afterEach(async () => {
  await User.deleteMany({});
  await Client.deleteMany({});
});

// Adicione logging nos testes para depurar o que está acontecendo
describe('Testes de autenticação', () => {
  it('Deve registrar um usuário', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'teste@exemplo.com',
        password: '123456',
        confirmPassword: '123456',
      });

    console.log('Resposta de registro:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token'); // Verifica se a resposta contém um token
    expect(typeof res.body.token).toBe('string'); // Verifica se o token é uma string
    if (!res.body.token) {
      throw new Error("Token não foi gerado corretamente durante o registro.");
    }
  });

  it('Deve fazer Login de um usuário', async () => {

    // Registre um usuário para fazer login
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    console.log('Resposta de login:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // Verifica se a resposta contém um token
    expect(typeof res.body.token).toBe('string'); // Verifica se o token é uma string
  }
  );
}
);

// Testes para rotas protegidas
describe('Testes de rotas protegidas', () => {
  it('Deve acessar uma rota protegida com um token válido', async () => {
    // Registre um usuário para obter um token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
      });

    expect(registerRes.statusCode).toBe(201); // Verifica se o registro foi bem-sucedido

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(loginRes.statusCode).toBe(200); // Verifica se o login foi bem-sucedido
    expect(loginRes.body).toHaveProperty('token'); // Verifica se o token foi retornado

    const token = loginRes.body.token;
    expect(token).toBeTruthy();

    // Acesse uma rota protegida com o token
    const res = await request(app)
      .get('/api/auth/dashboard') // no app.js as rotas de authRoutes estão definidas como /api/auth
      .set('Authorization', `Bearer ${token}`);

    console.log('Status da resposta:', res.statusCode); // Adiciona log do status da resposta
    console.log('Corpo da resposta:', res.body); // Adiciona log do corpo da resposta

    expect(res.statusCode).toBe(200); // Verifica se a resposta é 200 OK
    expect(res.body).toHaveProperty('message', 'Bem-vindo ao dashboard!');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('name', 'Teste Usuário');
    expect(res.body.user).toHaveProperty('email', 'test@test.com');
  });
});

// Testes para rotas de clientes
describe('Testes de rotas de clientes', () => {
  it('Deve criar um novo cliente', async () => {
    // Registre um usuário para obter um token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
      });

    expect(registerRes.statusCode).toBe(201); // Verifica se o registro foi bem-sucedido

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(loginRes.statusCode).toBe(200); // Verifica se o login foi bem-sucedido
    expect(loginRes.body).toHaveProperty('token'); // Verifica se o token foi retornado

    const token = loginRes.body.token;
    expect(token).toBeTruthy();

    // Crie um novo cliente
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Teste',
        email: 'client@test.com',
        phone: '27123456789',
      });

    console.log('Status da resposta:', res.statusCode); // Adiciona log do status da resposta
    console.log('Corpo da resposta:', res.body); // Adiciona log do corpo da resposta
    console.log('Cliente criado:', res.body.client); // Adiciona log do cliente criado

    expect(res.statusCode).toBe(201); // Verifica se a resposta é 201 Created
    expect(res.body).toHaveProperty('client');
    expect(res.body.client).toHaveProperty('name', 'Cliente Teste');
    expect(res.body.client).toHaveProperty('email', 'client@test.com');
    expect(res.body.client).toHaveProperty('phone', '123456789');

// Verifique se o cliente foi salvo no banco de dados
    const client = await Client.findById
      (res.body.client._id);
    expect(client).toBeTruthy();
    expect(client.name).toBe('Cliente Teste');
    expect(client.email).toBe('client@test.com');
    expect(client.phone).toBe('123456789');
  });
});
