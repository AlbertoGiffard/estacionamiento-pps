import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Firebase {
  constructor() {
    // Inicializa Firebase con la configuración
    const firebaseConfig = {
      apiKey: "AIzaSyB8CybzZByE7AMyTyyATPqRj2PtMvoR7eM",
      authDomain: "pps-6to-semestre.firebaseapp.com",
      projectId: "pps-6to-semestre",
      storageBucket: "pps-6to-semestre.appspot.com",
      messagingSenderId: "445817961783",
      appId: "1:445817961783:web:cb7d61ff2e62619c02aeb2"
    };
    firebase.initializeApp(firebaseConfig);

    // Crea referencias a la autenticación y la base de datos de Firebase
    this.auth = firebase.auth();
    this.database = firebase.database();
  }

  // Métodos de autenticación
  iniciarSesion = (email, contrasenia) => {
    return this.auth.signInWithEmailAndPassword(email, contrasenia);
  };
  //verifica si existe el mail o no
  verificarMail = (email) => {
    return this.auth.fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers && providers.length > 0) {
          // El correo electrónico ya está en uso
          return false;
        } else {
          // El correo electrónico no está en uso
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        // Error al validar el correo electrónico
        return false;
      });
  }

  registrarse = (email, contrasenia) => {
    return this.auth.createUserWithEmailAndPassword(email, contrasenia);
  };

  cerrarSesion = () => {
    return this.auth.signOut();
  };

  // Métodos de base de datos
  //el parametro tabla nos indica que tabla debe utilizar, ejemplo (usuarios, vehiculos, etc)
  crearEnDB = (uid, tabla, data) => {
    return this.database.ref(`${tabla}/${uid}`).set(data);
  };

  //esta funcion puede traer un valor o todos, ejemplos
  //todos: tabla = usuarios
  //uno: tabla = usuarios/1234AABH
  //en este ultimo caso traera solo el campo que haga match
  obtenerValorEnDB = (tabla) => {
    return this.database.ref(`${tabla}`).once('value');
  };

  actualizarEnDB = (uid, tabla, data) => {
    return this.database.ref(`${tabla}/${uid}`).update(data);
  };

  borrarEnDB = (uid, tabla) => {
    return this.database.ref(`${tabla}/${uid}`).remove();
  };
}

export default Firebase;