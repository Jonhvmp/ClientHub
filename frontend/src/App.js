import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddClient from './pages/AddClient';
import EditClient from './pages/EditClient';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Gerenciamento de Clientes</h1>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/edit-client/:id" element={<EditClient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
