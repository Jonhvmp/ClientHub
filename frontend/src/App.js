import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard'; // Página protegida
import AddClient from './pages/AddClient';
import EditClient from './pages/EditClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/edit-client/:id" element={<EditClient />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
