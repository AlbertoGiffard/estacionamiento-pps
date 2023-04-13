import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';


const StatusUsuario = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    LISTA_NEGRA: 'LISTA_NEGRA',
    SIN_SUSCRIPCION: 'SIN_SUSCRIPCION'
};

const Roles = {
    ADMIN: 'ADMIN',
    DUENIO: 'DUENIO',
    EMPLEADO: 'EMPLEADO',
    CLIENTE: 'CLIENTE'
};

class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: uuid(),
            nombre: props.nombre,
            apellido: props.apellido,
            dni: props.dni,
            email: props.email,
            contrasenia: props.contrasenia,
            telefono: props.telefono,
            direccion: props.direccion,
            rol: verificarRol(props.rol),
            fechaAlta: new Date(),
            foto: props.foto,
            idEstacionamiento: props.idEstacionamiento,
            status: StatusUsuario.ACTIVO
        };
    }

    //dependiendo de coomo venga este atributo lo definira con alguno de los roles previamente cargado
    verificarRol = (rol) => {
        resultado = Roles.CLIENTE;

        switch (rol) {
            case 'admin':
                resultado = Roles.ADMIN;
                break;

            case 'duenio':
                resultado = Roles.DUENIO;
                break;

            case 'empleado':
                resultado = Roles.EMPLEADO;
                break;

            default:
                break;
        }

        return resultado;
    }

    modificarStatus = (status) => {
        switch (status) {
            case 'activo':
                this.setState({ status: StatusUsuario.ACTIVO });
                break;

            case 'inactivo':
                this.setState({ status: StatusUsuario.INACTIVO });
                break;

            case 'lista_negra':
                this.setState({ status: StatusUsuario.LISTA_NEGRA });
                break;

            default:
                this.setState({ status: StatusUsuario.SIN_SUSCRIPCION });
                break;
        }
    }

    /* Sobrescribe todos los campos, aca la idea seria que si solo modifica el email por ejemplo,  
    los demas campos sean los mismos, es decir pasarle los mismos datos que ya tenia */
    modificarCampos = (email, contrasenia, telefono, foto) => {
        this.setState({
            email: email,
            contrasenia: contrasenia,
            telefono: telefono,
            foto: foto
        });
    }

    //el iniciar sesion si fue exitosa debe redirigir
    iniciarSesion = (email, contrasenia) => {
        evento.preventDefault();

        const { email, contrasenia } = this.state;
        const firebase = new Firebase();
        let resultado = false;

        firebase.iniciarSesion(email, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Inicio de sesión exitoso para el usuario:", email);
                resultado = true;
                // Aquí deberia ver un redireccionamiento
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });

        return resultado;
    }

    cerrarSesion = () => {
        const firebase = new Firebase();

        firebase.cerrarSesion()
            .then(() => {
                // La sesión se cerró correctamente, redirecciona
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    }

    //realiza el registro de nuevos usuarios y los carga a la base de datos
    //el .then nos hará saber a donde se llame esta operacion si fue ok o no
    registrarse = (evento) => {
        evento.preventDefault();

        const { idUsuario, nombre, apellido, dni, email, contrasenia, telefono, direccion, rol, fechaAlta, foto, idEstacionamiento, status } = this.state;
        const firebase = new Firebase();
        let resultado = false;

        if (firebase.verificarMail(email)) {
            firebase.registrarse(email, contrasenia)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;

                    firebase.crearUsuarioDB(uid, 'usuarios', {
                        uid,
                        idUsuario,
                        nombre,
                        apellido,
                        dni,
                        email,
                        contrasenia,
                        telefono,
                        direccion,
                        rol,
                        fechaAlta,
                        foto,
                        idEstacionamiento,
                        status
                    });

                    resultado = true;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorMessage);
                });
        }

        return resultado;
    };

    obtenerUsuarios = () => {
        //const { idUsuario, nombre, apellido, dni, email, contrasenia, telefono, direccion, rol, fechaAlta, foto, idEstacionamiento, status } = this.state;
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerTodosEnDB('usuarios')
            .then((data) => {
                const usuarios = data.val();

                // Recorremos cada usuario y mostramos sus datos en la consola
                Object.keys(usuarios).map((key) => {
                    const usuario = usuarios[key];
                    console.log(usuario.idUsuario, usuario.nombre, usuario.apellido, usuario.dni, usuario.email, usuario.contrasenia, usuario.telefono, usuario.direccion, usuario.rol, usuario.fechaAlta, usuario.foto, usuario.idEstacionamiento, usuario.status);
                });
                //aca puede haber un redireccionamiento
                resultado = true;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });

        return resultado;
    }

    //este nos servirá para traer un usuario en particular, por el idUsuario por ejemplo
    //como por ejemplo los que esten en lista negra
    obtenerUsuariosPorCampo = (filtro) => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerValorEnDB(`usuarios/${filtro}`)
            .then((data) => {
                const usuarios = data.val();

                // validamos que existan datos
                if (usuarios) {
                    // Recorremos cada usuario y mostramos sus datos en la consola
                    Object.keys(usuarios).map((key) => {
                        const usuario = usuarios[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(usuario.idUsuario, usuario.nombre, usuario.apellido, usuario.dni, usuario.email, usuario.contrasenia, usuario.telefono, usuario.direccion, usuario.rol, usuario.fechaAlta, usuario.foto, usuario.idEstacionamiento, usuario.status);
                    });
                    resultado = true;
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });

        return resultado;
    }

    /* render() {
        // Código JSX para renderizar el componente
        return (
            <div>
                <p>Dato</p>
            </div>
        );
    } */
}

export default Usuario;