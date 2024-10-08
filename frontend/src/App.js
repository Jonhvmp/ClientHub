
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/global.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ClientList from './pages/ClientList/ClientList';
import ClientCreate from './pages/ClientCreate/ClientCreate';
import ClientEdit from './pages/ClientEdit/ClientEdit';
import ClientDetails from './pages/ClientDetails/ClientDetails'; // Alterado
import ClientDelete from './pages/ClientDelete/ClientDelete';
import ClientSearch from './pages/ClientSearch/ClientSearch';
import UserProfile from './pages/UserProfile/UserProfile'; // Alterado
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/create" element={<ClientCreate />} />
          <Route path="/clients/:id/edit" element={<ClientEdit />} />
          <Route path="/clients/:id/details" element={<ClientDetails />} />
          <Route path="/clients/:id/delete" element={<ClientDelete />} />
          <Route path="/clients/search" element={<ClientSearch />} />
          <Route path="/profile" element={<UserProfile />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
