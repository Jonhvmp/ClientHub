import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/global.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import ClientList from './pages/ClientList/ClientList';
import ClientCreate from './pages/ClientCreate/ClientCreate';
import ClientEdit from './pages/ClientEdit/ClientEdit';
import ClientDetails from './pages/ClientDetails/ClientDetails';
import ClientDelete from './pages/ClientDelete/ClientDelete';
import ClientSearch from './pages/ClientSearch/ClientSearch';
import UserProfile from './pages/UserProfile/UserProfile';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header/Header'; // Importe o Header

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/clients"
            element={
              <>
                <Header />
                <ClientList />
              </>
            }
          />
          <Route
            path="/clients/create"
            element={
              <>
                <Header />
                <ClientCreate />
              </>
            }
          />
          <Route
            path="/clients/:id/edit"
            element={
              <>
                <Header />
                <ClientEdit />
              </>
            }
          />
          <Route
            path="/clients/:id/details"
            element={
              <>
                <Header />
                <ClientDetails />
              </>
            }
          />
          <Route
            path="/clients/:id/delete"
            element={
              <>
                <Header />
                <ClientDelete />
              </>
            }
          />
          <Route
            path="/clients/search"
            element={
              <>
                <Header />
                <ClientSearch />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <UserProfile />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
