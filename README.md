# ClientHub

ClientHub é um SaaS (Software como Serviço) completo e profissional para gerenciamento de clientes e assinaturas. Esta aplicação permite que empresas ou indivíduos gerenciem informações de clientes, tipos de assinatura, datas de expiração, renovação de assinaturas e muito mais, tudo através de uma interface web amigável e intuitiva.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Testes](#testes)
- [Implantação](#implantação)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Tecnologias Utilizadas

### **Frontend**

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Cliente HTTP para comunicação com a API.
- **React Router DOM**: Gerenciamento de rotas no frontend.
- **Bootstrap** ou **Material-UI**: Frameworks CSS para estilização e responsividade.

### **Backend**

- **Node.js** com **Express.js**: Ambiente de execução JavaScript para o servidor e framework minimalista para construção de APIs.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB e Node.js.
- **JSON Web Tokens (JWT)**: Autenticação segura entre cliente e servidor.

### **Outras Tecnologias**

- **Docker**: Containerização da aplicação para facilitar o desenvolvimento e implantação.
- **Nginx**: Servidor web para servir o frontend em produção.
- **Git**: Controle de versão.
- **ESLint e Prettier**: Ferramentas para padronização e formatação de código.

## Estrutura do Projeto

```
clienthub/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── LICENSE
```

## Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **MongoDB** (local ou em um serviço na nuvem como o MongoDB Atlas)
- **Docker** e **Docker Compose** (opcional, mas recomendado para facilitar a configuração)

## Instalação

### Backend

1. **Configuração Inicial**

   ```bash
   cd clienthub/backend
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurar Variáveis de Ambiente**

   Renomeie o arquivo `.env.example` para `.env` e preencha as informações necessárias:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clienthub
   JWT_SECRET=sua_chave_secreta_aqui
   ```

4. **Executar a Aplicação**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

### Frontend

1. **Configuração Inicial**

   ```bash
   cd clienthub/frontend
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurar Variáveis de Ambiente**

   Renomeie o arquivo `.env.example` para `.env` e preencha as informações necessárias:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Executar a Aplicação**

   ```bash
   npm start
   # ou
   yarn start
   ```

## Uso

- Acesse o frontend em `http://localhost:3000` para interagir com a aplicação.
- Utilize as funcionalidades de cadastro, edição, exclusão e visualização de clientes e assinaturas.
- Para acessar rotas protegidas, é necessário realizar o login.

## Funcionalidades

- **Gerenciamento de Clientes**
  - Adicionar novos clientes.
  - Editar informações existentes.
  - Excluir clientes.
  - Visualizar detalhes de clientes.

- **Gerenciamento de Assinaturas**
  - Definir tipos de assinatura (mensal, trimestral).
  - Renovar e rebaixar assinaturas.
  - Notificações de assinaturas próximas do vencimento.

- **Autenticação e Autorização**
  - Sistema de login seguro com JWT.
  - Proteção de rotas sensíveis.

- **Relatórios e Análises**
  - Visualização de dados por meio de gráficos.
  - Relatórios de assinaturas expiradas e próximas do vencimento.

- **Pesquisa Avançada**
  - Busca de clientes por nome, email ou telefone.

- **Exportação de Dados**
  - Exportar dados de clientes em formatos CSV ou JSON.

## Testes

### Backend

- **Testes Unitários e de Integração**

  ```bash
  npm test
  # ou
  yarn test
  ```

### Frontend

- **Testes de Componentes**

  ```bash
  npm test
  # ou
  yarn test
  ```

## Implantação

### Usando Docker

1. **Certifique-se de que o Docker e o Docker Compose estão instalados.**

2. **Construir e Executar os Contêineres**

   Na raiz do projeto:

   ```bash
   docker-compose up --build
   ```

3. **Acessar a Aplicação**

   - Frontend: `http://localhost:80`
   - Backend: `http://localhost:5000`

### Sem Docker

1. **Backend**

   - Configure um servidor para hospedar a API Node.js.
   - Certifique-se de que o MongoDB está acessível.
   - Configure as variáveis de ambiente de produção.

2. **Frontend**

   - Execute `npm run build` ou `yarn build` para gerar os arquivos estáticos.
   - Sirva os arquivos estáticos usando um servidor web como Nginx ou Apache.

3. **Configuração de Domínio e SSL**

   - Configure seu domínio para apontar para o servidor.
   - Implemente certificados SSL/TLS para segurança (exemplo: Let's Encrypt).

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, por favor siga os passos abaixo:

1. **Fork o Repositório**
2. **Crie uma Branch para sua Feature**

   ```bash
   git checkout -b minha-nova-feature
   ```

3. **Commit suas Alterações**

   ```bash
   git commit -m 'Adiciona nova funcionalidade X'
   ```

4. **Envie para o Repositório Remoto**

   ```bash
   git push origin minha-nova-feature
   ```

5. **Abra um Pull Request**

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- **Autor**: [Jonh Alex]
- **Email**: [it.jonhpaz@gmail.com]
- **LinkedIn**: [https://www.linkedin.com/in/Jonhvmp](https://www.linkedin.com/in/Jonhvmp)
- **Site Pessoal**: [https://www.github.com/jonhvmp](https://www.github.com/jonhvmp)

---

Esperamos que o ClientHub atenda às suas necessidades de gerenciamento de clientes e assinaturas. Se você tiver alguma dúvida ou sugestão, não hesite em entrar em contato!
