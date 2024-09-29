import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/ClientList';
import ClientCreate from './pages/ClientCreate';
import ClientEdit from './pages/ClientEdit';
import ClientView from './pages/ClientView';
import ClientSearch from './pages/ClientSearch';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/clientes" element={<PrivateRoute><ClientList /></PrivateRoute>} />
        <Route path="/clientes/novo" element={<PrivateRoute><ClientCreate /></PrivateRoute>} />
        <Route path="/clientes/:id/editar" element={<PrivateRoute><ClientEdit /></PrivateRoute>} />
        <Route path="/clientes/:id" element={<PrivateRoute><ClientView /></PrivateRoute>} />
        <Route path="/clientes/search" element={<ClientSearch />} />
        <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
