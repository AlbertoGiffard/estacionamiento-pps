import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";

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

const Usuario = (props) => {
    const [idUsuario, setIdUsuario] = useState(props.idUsuario);
    const [nombre, setNombre] = useState(props.nombre);
    const [apellido, setApellido] = useState(props.apellido);
    const [dni, setDni] = useState(props.dni);
    const [email, setEmail] = useState(props.email);
    const [contrasenia, setContrasenia] = useState(props.contrasenia);
    const [datosTarjeta, setDatosTarjeta] = useState(props.datosTarjeta);//Este dato sera un object
    /* 
        datosTarjeta: {
            nombreTitular,
            numero,
            fechaVencimiento,
            codSeguridad
        }
    */
    const [telefono, setTelefono] = useState(props.telefono);
    const [direccion, setDireccion] = useState(props.direccion);
    const [rol, setRol] = useState(verificarRol(props.rol));
    const [fechaAlta, setFechaAlta] = useState(new Date());
    const [foto, setFoto] = useState(props.foto);
    const [idEstacionamiento, setIdEstacionamiento] = useState(props.idEstacionamiento);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        registrar();
    }, []);

    //dependiendo de coomo venga este atributo lo definira con alguno de los roles previamente cargado
    const verificarRol = (rol) => {
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

    const modificarStatus = (status) => {
        switch (status) {
            case 'activo':
                setStatus(StatusUsuario.ACTIVO);
                break;

            case 'inactivo':
                setStatus(StatusUsuario.INACTIVO);
                break;

            case 'lista_negra':
                setStatus(StatusUsuario.LISTA_NEGRA);
                break;

            default:
                setStatus(StatusUsuario.SIN_SUSCRIPCION);
                break;
        }

        return actualizar();
    }

    /* Sobrescribe todos los campos, aca la idea seria que si solo modifica el email por ejemplo,  
    los demas campos sean los mismos, es decir pasarle los mismos datos que ya tenia */
    const modificarCampos = (email, contrasenia, telefono, foto, datosTarjeta) => {
        setEmail(email);
        setContrasenia(contrasenia);
        setTelefono(telefono);
        setFoto(foto);
        setDatosTarjeta(datosTarjeta);

        return actualizar();
    }

    //el iniciar sesion si fue exitosa debe redirigir
    const iniciarSesion = (evento, email, contrasenia) => {
        evento.preventDefault();

        const { email, contrasenia } = state;
        const firebase = new Firebase();

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
    }

    const cerrarSesion = () => {
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
    const registrarse = (evento) => {
        evento.preventDefault();

        const { idUsuario, nombre, apellido, dni, email, contrasenia, telefono, direccion, rol, fechaAlta, foto, idEstacionamiento, status, datosTarjeta } = state;
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
                        status,
                        datosTarjeta
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

    const obtenerUsuarios = () => {
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

    const actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        const { idUsuario, email, contrasenia, datosTarjeta, telefono, direccion, foto, status } = state;

        firebase.actualizarEnDBSinUid('usuarios', 'idUsuario', idUsuario, {
            email,
            contrasenia,
            datosTarjeta,
            telefono,
            direccion,
            foto,
            status
        })
            .then(() => {
                resultado = true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
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