import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/Login.js';
import SignUp from './Components/Signup.js';
import Navegar from './Components/Navegar.js';
import Perfil from './Components/perfil.js';
import VerReservas from './Components/VerReservas.js'; 
import ReservarTaller from './Components/ReservarTaller.js';
import Pago from './Components/Pago.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/navegar" element={<Navegar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/verreservas" element={<VerReservas />} />
        <Route path="/reservartaller" element={<ReservarTaller />} />
        <Route path="/pago" element={<Pago />} />
      </Routes>
    </Router>
  );
}

export default App;
