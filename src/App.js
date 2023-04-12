import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './componentes/header/Header';
import Inicio from './componentes/inicio/Inicio';
import Footer from './componentes/footer/Footer';

/* const firebaseConfig = {
  apiKey: "AIzaSyB8CybzZByE7AMyTyyATPqRj2PtMvoR7eM",
  authDomain: "pps-6to-semestre.firebaseapp.com",
  projectId: "pps-6to-semestre",
  storageBucket: "pps-6to-semestre.appspot.com",
  messagingSenderId: "445817961783",
  appId: "1:445817961783:web:cb7d61ff2e62619c02aeb2"
};

firebase.initializeApp(firebaseConfig); */

function App() {
  return (
    <div className="App">
      <Header />
      <Inicio />
      <Footer />
    </div>
  );
}

export default App;
