import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import * as firebase from "firebase/app";
import "firebase/firestore";
import Header from './componentes/header/Header';
import Inicio from './componentes/inicio/Inicio';
import Footer from './componentes/footer/Footer';
import Login from './componentes/frontend/login/Login';
import Registrarse from './componentes/frontend/registrarse/Registrarse';
import Dashboard from './componentes/frontend/dashboard/Dashboard';
import NuevaReserva from './componentes/frontend/moduloReserva/nuevaReserva/NuevaReserva';

const firebaseConfig = {
  apiKey: "AIzaSyB8CybzZByE7AMyTyyATPqRj2PtMvoR7eM",
  authDomain: "pps-6to-semestre.firebaseapp.com",
  projectId: "pps-6to-semestre",
  storageBucket: "pps-6to-semestre.appspot.com",
  messagingSenderId: "445817961783",
  appId: "1:445817961783:web:cb7d61ff2e62619c02aeb2"
};

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <Routes >
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/nuevaReserva" element={<NuevaReserva />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
