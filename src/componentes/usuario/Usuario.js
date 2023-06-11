import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";

export const StatusUsuario = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    LISTA_NEGRA: 'LISTA_NEGRA',
    SIN_SUSCRIPCION: 'SIN_SUSCRIPCION'
};

export const Roles = {
    ADMIN: 'ADMIN',
    DUENIO: 'DUENIO',
    EMPLEADO: 'EMPLEADO',
    CLIENTE: 'CLIENTE'
};

//esto debe ser el extend Component
//ver todas las demas clases
class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: props.idUsuario,
            nombre: props.nombre,
            apellido: props.apellido,
            dni: props.dni,
            email: props.email,
            contrasenia: props.contrasenia,
            datosTarjeta: props.datosTarjeta,
            telefono: props.telefono,
            direccion: props.direccion,
            rol: props.rol,
            fechaAlta: new Date(),
            foto: props.foto,
            idEstacionamiento: props.idEstacionamiento,
            status: props.status
        };
    }

    //dependiendo de coomo venga este atributo lo definira con alguno de los roles previamente cargado
    verificarRol = (rol) => {
        let resultado = Roles.CLIENTE;

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

        return this.actualizar();
    }

    /* Sobrescribe todos los campos, aca la idea seria que si solo modifica el email por ejemplo,  
    los demas campos sean los mismos, es decir pasarle los mismos datos que ya tenia */
    modificarCampos = (email, contrasenia, telefono, foto, datosTarjeta) => {
        this.setState({ email: email });
        this.setState({ contrasenia: contrasenia });
        this.setState({ telefono: telefono });
        this.setState({ foto: foto });
        this.setState({ datosTarjeta: datosTarjeta });

        return this.actualizar();
    }

    //el iniciar sesion si fue exitosa debe redirigir
    iniciarSesion = (evento, email, contrasenia) => {
        evento.preventDefault();
        const firebase = new Firebase();

        firebase.iniciarSesion(email, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Inicio de sesión exitoso para el usuario:", email);
                let resultado = true;
                // Aquí deberia ver un redireccionamiento
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
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
    registrarse = () => {

        const {
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
            status,
            datosTarjeta,
        } = this.state;
        const firebase = new Firebase();

        if (firebase.verificarMail(email)) {
            return firebase.registrarse(email, contrasenia)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;

                    return firebase.crearEnDB(uid, 'usuarios', this.state);
                })
                .then((uid) => {
                    console.log('Usuario registrado correctamente con uid', uid);
                    // hacer algo con el uid devuelto, como redirigir a una página de inicio
                    return uid;
                })
                .catch((error) => {
                    console.error('Error al registrar usuario:', error);
                });
        } else {
            return Promise.resolve(false);
        }
    };

    obtenerUsuarios = () => {
        const firebase = new Firebase();

        firebase.obtenerTodosEnDB('usuarios')
            .then((data) => {
                const usuarios = data.val();

                // Recorremos cada usuario y mostramos sus datos en la consola
                Object.keys(usuarios).map((key) => {
                    const usuario = usuarios[key];
                    console.log(usuario.idUsuario, usuario.nombre, usuario.apellido, usuario.dni, usuario.email, usuario.contrasenia, usuario.telefono, usuario.direccion, usuario.rol, usuario.fechaAlta, usuario.foto, usuario.idEstacionamiento, usuario.status, usuario.datosTarjeta);
                });
                //aca puede haber un redireccionamiento
                return true;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    //este nos servirá para traer un usuario en particular, por el idUsuario por ejemplo
    //como por ejemplo los que esten en lista negra
    obtenerUsuariosPorCampo = (filtro) => {
        const firebase = new Firebase();

        firebase.obtenerValorEnDB(`usuarios/${filtro}`)
            .then((data) => {
                const usuarios = data.val();

                // validamos que existan datos
                if (usuarios) {
                    // Recorremos cada usuario y mostramos sus datos en la consola
                    Object.keys(usuarios).map((key) => {
                        const usuario = usuarios[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(usuario.idUsuario, usuario.nombre, usuario.apellido, usuario.dni, usuario.email, usuario.contrasenia, usuario.telefono, usuario.direccion, usuario.rol, usuario.fechaAlta, usuario.foto, usuario.idEstacionamiento, usuario.status, usuario.datosTarjeta);
                    });
                    return true;
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    static actualizar = (usuario) => {
        const firebase = new Firebase();
        const { idUsuario } = usuario;

        return firebase.actualizarEnDBSinUid('usuarios', 'idUsuario', idUsuario, usuario)
            .then(() => {
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    render() {
        const {
            idUsuario,
            nombre,
            apellido,
            dni,
            email,
            contrasenia,
            datosTarjeta,
            telefono,
            direccion,
            rol,
            fechaAlta,
            foto,
            idEstacionamiento,
            status
        } = this.state;

        return (
            <div>
                {/* Render the component using the state values */}
            </div>
        );
    }
}

export default Usuario;