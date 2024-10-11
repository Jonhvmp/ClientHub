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
  });

  it('Deve fazer login de um usuário', async () => {
    // Registrar um usuário primeiro
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'teste@exemplo.com',
        password: '123456',
        confirmPassword: '123456',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'teste@exemplo.com',
        password: '123456',
      });

    console.log('Resposta de login:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('Testes de perfil de usuário', () => {
  let token;

  beforeEach(async () => {
    // Registrar e fazer login para obter um token
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'teste@exemplo.com',
        password: '123456',
        confirmPassword: '123456',
      });

    token = res.body.token;
  });

  it('Deve obter o perfil do usuário logado', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).not.toBeNull();
  });

  it('Deve atualizar o perfil do usuário logado', async () => {
    const res = await request(app)
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Novo Nome',
        password: '123456',
        confirmPassword: '123456',
      });

    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('name', 'Novo Nome');
    expect(res.statusCode).toEqual(200);
  });
});

// Modificar para garantir que as respostas sejam registradas
describe('Testes de clientes', () => {
  let token;
  let clientId;

  beforeEach(async () => {
    // Registrar e fazer login para obter um token
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Teste Usuário',
        email: 'teste@exemplo.com',
        password: '123456',
        confirmPassword: '123456',
      });

    token = res.body.token;

    // Criar um cliente para ser utilizado nos testes
    const clientRes = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Teste',
        email: 'cliente@teste.com',
        phone: '123456789',
      });

    console.log('Resposta de criação de cliente:', clientRes.body);
    if (clientRes.body && clientRes.body.client) {
      clientId = clientRes.body.client._id;
    } else {
      console.error('Erro ao criar cliente, resposta inesperada:', clientRes.body);
    }
  });

  it('Deve criar um cliente', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Novo',
        email: 'novo@cliente.com',
        phone: '987654321',
      });

    console.log('Resposta de criação de novo cliente:', res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('client');
    expect(res.body.client.name).toBe('Cliente Novo');
  });

  it('Deve obter todos os clientes', async () => {
    const res = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('clients');
    expect(res.body.clients.length).toBeGreaterThan(0);
  });

  it('Deve obter um cliente por ID', async () => {
    const res = await request(app)
      .get(`/api/clients/${clientId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.client._id).toBe(clientId);
  });

  it('Deve atualizar um cliente', async () => {
    const res = await request(app)
      .put(`/api/clients/${clientId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cliente Atualizado',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.client.name).toBe('Cliente Atualizado');
  });

  it('Deve deletar um cliente', async () => {
    const res = await request(app)
      .delete(`/api/clients/${clientId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Cliente deletado com sucesso');
  });
});

// Fechar conexão com o banco de dados após todos os testes
afterAll(async () => {
  await mongoose.connection.close();
});
