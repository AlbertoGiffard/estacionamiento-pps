import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
//const database = firebase.database();
const firestore = firebase.firestore();

class Firebase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    // Inicializa Firebase con la configuración
    firebase.initializeApp(firebaseConfig);

    // Agrega un listener para el cambio de estado de autenticación
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user, loading: false });
    });
  }
  
  // Métodos de autenticación
  iniciarSesion = (email, contrasenia) => {
    return auth.signInWithEmailAndPassword(email, contrasenia);
  };
  //verifica si existe el mail o no
  verificarMail = (email) => {
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

  registrarse = (email, contrasenia) => {
    return auth.createUserWithEmailAndPassword(email, contrasenia);
  };

  cerrarSesion = () => {
    return auth.signOut();
  };

  // Métodos de base de datos
  //el parametro tabla nos indica que tabla debe utilizar, ejemplo (usuarios, vehiculos, etc)
  crearEnDB = (uid, tabla, data) => {
    const db = firebase.firestore();
    const docRef = db.collection(tabla).doc(uid);
  
    return docRef.set(data)
      .then(() => {
        console.log('Documento guardado correctamente en la colección', tabla, 'con id', uid);     
        return uid;   
      })
      .catch((error) => {
        console.error('Error al guardar el documento en la colección', tabla, 'con id', uid, ':', error);
        throw error;
      });
  };

  crearEnDBSinUid = (tabla, data) => {
    const db = firebase.firestore();
    const collectionRef = db.collection(tabla);
    
    return collectionRef.add(data)
      .then((docRef) => {
        const uid = docRef.id;
        console.log('Documento guardado correctamente en la colección', tabla, 'con id', uid);
        return uid;
      })
      .catch((error) => {
        console.error('Error al guardar el documento en la colección', tabla, ':', error);
        throw error;
      });
  };

  //el parametro tabla nos indica que tabla debe utilizar, ejemplo (usuarios, vehiculos, etc)
  //puede que no funcione!!!!!!!!!!!!!!!!!!!!!!
  /* const crearEnDBSinUid = (tabla, data) => {
    const collectionRef = database.ref(); //esta linea
    return collectionRef
      .add(data)
      .then(() => {
        console.log('El registro se agregó con éxito');
      })
      .catch((error) => {
        console.error('Error al agregar el registro:', error);
      });
  }; */

  //esta funcion puede traer un valor o todos, ejemplos
  //todos: tabla = usuarios
  //uno: tabla = usuarios/1234AABH
  //en este ultimo caso traera solo el campo que haga match
  obtenerValorEnDB = (tabla, id = null) => {
    
    let query = firestore.collection(tabla);
    console.log("id:", id);
    if (id) {
        query = query.doc(id);
    }
    return query.get()
      .then((snapshot) => {
        // Si se solicita un solo valor, devolver el valor correspondiente
        if (id) {
          return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
        }
        // Si se solicitan varios valores, devolver un array con todas las entradas
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        return data;
      })
      .catch((error) => {
        console.error(error);
        // Error al obtener el valor de la base de datos
        return null;
      });
  };

  obtenerValorPorUnCampoEspecifico = (tabla, condiciones) => {
    let query = firestore.collection(tabla);
  
    // Agregar las condiciones de búsqueda a la query
    for (let campo in condiciones) {
      if (condiciones[campo] !== null && condiciones[campo] !== undefined) {
        query = query.where(campo, "==", condiciones[campo]);
      }
    }
  
    // Ejecutar la query y devolver los resultados
    return query.get()
      .then((querySnapshot) => {
        // Si no hay resultados, devolver null
        if (querySnapshot.empty) {
          return null;
        }
        // Si se solicita un solo valor, devolver el valor correspondiente
        if (querySnapshot.size === 1) {
          return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        }
        // Si se solicitan varios valores, devolver un arreglo con todas las entradas
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        return data;
      })
      .catch((error) => {
        console.error(error);
        // Error al obtener el valor de la base de datos
        return null;
      });
  };

  actualizarEnDB = (id, tabla, data) => {
    return firestore.collection(tabla).doc(id).update(data);
  };

  /* const actualizarEnDBSinUid = (tabla, campo, valor, data) => {
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
  }; */

  borrarEnDB = (id, tabla) => {
    return firestore.collection(tabla).doc(id).delete();
  };

  /* const obtenerCantidadFilas = (tabla, campo, valor) => {
    return database
      .ref(tabla)
      .orderByChild(campo)
      .equalTo(valor)
      .once('value')
      .then((snapshot) => snapshot.numChildren());
  }; */

  /* const obtenerPuestosEstacionamientoPorEstacionamiento = (idEstacionamiento) => {
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
  } */
}

export default Firebase;