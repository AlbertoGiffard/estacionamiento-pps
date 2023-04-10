import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './componentes/header/Header';
import Inicio from './componentes/inicio/Inicio';
import Footer from './componentes/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Inicio/>
      <Footer/>
    </div>
  );
}

export default App;
