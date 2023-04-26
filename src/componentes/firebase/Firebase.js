import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB8CybzZByE7AMyTyyATPqRj2PtMvoR7eM",
  authDomain: "pps-6to-semestre.firebaseapp.com",
  projectId: "pps-6to-semestre",
  storageBucket: "pps-6to-semestre.appspot.com",
  messagingSenderId: "445817961783",
  appId: "1:445817961783:web:cb7d61ff2e62619c02aeb2"
};

// Inicializa Firebase con la configuración
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const Firebase = () => {
  // Métodos de autenticación
  const iniciarSesion = (email, contrasenia) => {
    return auth.signInWithEmailAndPassword(email, contrasenia);
  };
  //verifica si existe el mail o no
  const verificarMail = (email) => {
    return auth.fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods && signInMethods.length > 0) {
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

  const registrarse = (email, contrasenia) => {
    return auth.createUserWithEmailAndPassword(email, contrasenia);
  };

  const cerrarSesion = () => {
    return auth.signOut();
  };

  // Métodos de base de datos
  //el parametro tabla nos indica que tabla debe utilizar, ejemplo (usuarios, vehiculos, etc)
  const crearEnDB = (uid, tabla, data) => {
    return database.ref(`${tabla}/${uid}`).set(data);
  };

  //el parametro tabla nos indica que tabla debe utilizar, ejemplo (usuarios, vehiculos, etc)
  const crearEnDBSinUid = (tabla, data) => {
    return collectionRef.push(data)
      .then(() => {
        console.log('El registro se agregó con éxito');
      })
      .catch((error) => {
        console.error('Error al agregar el registro:', error);
      });
  };

  //esta funcion puede traer un valor o todos, ejemplos
  //todos: tabla = usuarios
  //uno: tabla = usuarios/1234AABH
  //en este ultimo caso traera solo el campo que haga match
  //En este código, se utiliza la función once() de Firebase para obtener el valor de la referencia una sola vez. Si la referencia no existe, la función devuelve null. Si se solicita un solo valor, se devuelve el valor correspondiente. Si se solicitan varios valores, se devuelve un objeto con todas las entradas.
  const obtenerValorEnDB = (tabla) => {
    return database.ref(tabla).once('value')
      .then((snapshot) => {
        // Si la referencia no existe, devolver null
        if (!snapshot.exists()) {
          return null;
        }
        // Si se solicita un solo valor, devolver el valor correspondiente
        if (snapshot.numChildren() === 1) {
          return snapshot.val();
        }
        // Si se solicitan varios valores, devolver un objeto con todas las entradas
        const values = {};
        snapshot.forEach((childSnapshot) => {
          values[childSnapshot.key] = childSnapshot.val();
        });
        return values;
      })
      .catch((error) => {
        console.error(error);
        // Error al obtener el valor de la base de datos
        return null;
      });
  };

  const actualizarEnDB = (uid, tabla, data) => {
    return database.ref(`${tabla}/${uid}`).update(data);
  };

  const actualizarEnDBSinUid = (tabla, campo, valor, data) => {
    // Realiza una consulta para buscar el documento que deseas actualizar
    return database.ref(tabla)
      .orderByChild(campo)
      .equalTo(valor)
      .once('value')
      .then((snapshot) => {
        // Recorre los resultados de la consulta para obtener el uid del documento
        let uid;
        snapshot.forEach((childSnapshot) => {
          uid = childSnapshot.key;
        });

        // Actualiza el documento usando el uid obtenido
        if (uid) {
          return actualizarEnDB(uid, tabla, data);
        } else {
          console.error('No se encontró el documento a actualizar');
          return null;
        }
      })
      .catch((error) => {
        console.error('Error al buscar el documento a actualizar:', error);
        return null;
      });
  };

  const borrarEnDB = (uid, tabla) => {
    return database.ref(`${tabla}/${uid}`).remove();
  };

  const obtenerCantidadFilas = (tabla, campo, valor) => {
    return database
      .ref(tabla)
      .orderByChild(campo)
      .equalTo(valor)
      .once('value')
      .then((snapshot) => snapshot.numChildren());
  };

  const obtenerPuestosEstacionamientoPorEstacionamiento = (idEstacionamiento) => {
    return database
      .ref('puestosEstacionamientos')
      .orderByChild('idEstacionamiento')
      .equalTo(idEstacionamiento)
      .once('value')
      .then((snapshot) => {
        const puestos = [];
        snapshot.forEach((childSnapshot) => {
          const puesto = {
            id: childSnapshot.key,
            ...childSnapshot.val()
          };
          puestos.push(puesto);
        });
        return puestos;
      })
      .catch((error) => {
        console.error('Error al obtener puestos de estacionamiento:', error);
        return null;
      });
  }
}

export default Firebase;