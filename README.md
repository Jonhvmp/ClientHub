# ClientHub

ClientHub is a complete and professional SaaS (Software as a Service) for client and subscription management. This application allows businesses or individuals to manage client information, subscription types, expiration dates, subscription renewals, and more, all through a friendly and intuitive web interface.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Features](#features)
- [Tests](#tests)
- [Deployment](#deployment)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

## Technologies Used

### **Frontend**

- **React.js**: JavaScript library for building user interfaces.
- **Axios**: HTTP client for API communication.
- **React Router DOM**: Route management in the frontend.
- **TailwindCSS**: For an attractive and clean design.

### **Backend**

- **Node.js** with **Express.js**: JavaScript runtime environment for the server and minimalist framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: Secure authentication between client and server.

### **Other Technologies**

- **Docker**: Application containerization to facilitate development and deployment.
- **Nginx**: Web server to serve the frontend in production.
- **Git**: Version control.
- **ESLint and Prettier**: Tools for code standardization and formatting.

## Project Structure

```
clienthub/
backend/
├── node_modules/              # Node.js modules
├── config/                    # Global configurations (e.g., database, authentication)
│   ├── db.js                  # Database connection configuration
│   └── config.js              # Other global configurations
├── controllers/               # Control logic, communication between routes and models
│   └── clientController.js    # Client controller
├── models/                    # Model and schema definitions (e.g., clients, subscriptions)
│   └── clientModel.js         # Client model
├── routes/                    # Route definitions for each resource
│   └── clientRoutes.js        # Client-related routes
├── middlewares/               # Authentication, validation, etc., middlewares
│   └── authMiddleware.js      # Authentication middleware
├── services/                  # Service logic (e.g., email, payments)
│   └── notificationService.js # Service for sending notifications
├── app.js                     # Main file to start the Express server
├── package.json               # Node.js dependencies
└── package-lock.json          # Version lock for dependencies
|
frontend/
├── node_modules/              # NPM modules
├── public/                    # Static files (HTML, images, favicon)
│   ├── index.html             # Main HTML file
│   └── manifest.json          # PWA configuration
├── src/                       # Main source code
│   ├── assets/                # Static files (images, fonts, etc.)
│   ├── components/            # Reusable components
│   │   └── Navbar.js          # Example of a component
│   ├── pages/                 # Specific pages (e.g., Home, Dashboard)
│   │   └── Home.js            # Example of a page
│   ├── services/              # Backend communication (API requests)
│   │   └── api.js             # Axios configuration
│   ├── hooks/                 # Custom Hooks (shared logic between components)
│   │   └── useAuth.js         # Authentication hook
│   ├── styles/                # Global styling files (CSS or SCSS)
│   │   └── App.css            # Global styles
│   ├── App.js                 # Main React application component
│   ├── index.js               # React entry point
│   └── .env                   # Environment variables for the frontend
├── package.json               # Frontend dependencies
├── package-lock.json          # Version lock for dependencies
|── .gitignore                 # Ignore files in version control
├── docker-compose.yml
├── README.md
└── LICENSE
```

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud service like MongoDB Atlas)
- **Docker** and **Docker Compose** (optional but recommended for easier setup)

## Installation

### Backend

1. **Initial Setup**

   ```bash
   cd clienthub/backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**

   Rename the `.env.example` file to `.env` and fill in the required information:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/clienthub
   JWT_SECRET=your_secret_key_here
   ```

4. **Run the Application**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Frontend

1. **Initial Setup**

   ```bash
   cd clienthub/frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**

   Rename the `.env.example` file to `.env` and fill in the required information:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the Application**

   ```bash
   npm start
   # or
   yarn start
   ```

## Usage

- Access the frontend at `http://localhost:3000` to interact with the application.
- Use the features to register, edit, delete, and view clients and subscriptions.
- To access protected routes, you need to log in.

## Features

- **Client Management**
  - Add new clients.
  - Edit existing client information.
  - Delete clients.
  - View client details.

- **Subscription Management**
  - Define subscription types (monthly, quarterly).
  - Renew or downgrade subscriptions.
  - Notifications for subscriptions nearing expiration.

- **Authentication and Authorization**
  - Secure login system with JWT.
  - Protection of sensitive routes.

- **Reports and Analytics**
  - Data visualization through charts.
  - Reports on expired and soon-to-expire subscriptions.

- **Advanced Search**
  - Search clients by name, email, or phone.

- **Data Export**
  - Export client data in CSV or JSON formats.

## Tests

### Backend

- **Unit and Integration Tests**

  ```bash
  npm test
  # or
  yarn test
  ```

### Frontend

- **Component Tests**

  ```bash
  npm test
  # or
  yarn test
  ```

## Deployment

### Using Docker

1. **Ensure Docker and Docker Compose are installed.**

2. **Build and Run the Containers**

   At the project root:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**

   - Frontend: `http://localhost:80`
   - Backend: `http://localhost:5000`

### Without Docker

1. **Backend**

   - Set up a server to host the Node.js API.
   - Ensure MongoDB is accessible.
   - Configure the production environment variables.

2. **Frontend**

   - Run `npm run build` or `yarn build` to generate the static files.
   - Serve the static files using a web server like Nginx or Apache.

3. **Domain and SSL Setup**

   - Point your domain to the server.
   - Implement SSL/TLS certificates for security (e.g., Let's Encrypt).

## Contribution

Contributions are welcome! If you would like to contribute to this project, please follow the steps below:

1. **Fork the Repository**
2. **Create a Branch for Your Feature**

   ```bash
   git checkout -b my-new-feature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m 'Add new feature X'
   ```

4. **Push to the Remote Repository**

   ```bash
   git push origin my-new-feature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

- **Author**: [Jonh Alex]
- **Email**: [it.jonhpaz@gmail.com]
- **LinkedIn**: [https://www.linkedin.com/in/Jonhvmp](https://www.linkedin.com/in/Jonhvmp)
- **Personal Website**: [https://www.github.com/jonhvmp](https://www.github.com/jonhvmp)
