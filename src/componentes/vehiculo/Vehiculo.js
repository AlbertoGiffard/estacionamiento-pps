import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";


const TipoVehiculo = {
    BICICLETA: 'BICICLETA',
    MOTO: 'MOTO',
    AUTO: 'AUTO',
    CAMIONETA: 'CAMIONETA'
};

const StatusVehiculo = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    EN_PUESTO: 'EN_PUESTO'
};

const Vehiculo = (props) => {
    const [idVehiculo, setIdVehiculo] = useState(uuid());
    const [usuario, setUsuario] = useState(props.Usuario);
    const [marca, setMarca] = useState(props.marca);
    const [modelo, setModelo] = useState(props.modelo);
    const [patente, setPatente] = useState(props.patente);
    const [tipo, setTipo] = useState(validarTipo(props.tipoVehiculo));
    const [color, setColor] = useState(props.color);
    const [totalReservas, setTotalReservas] = useState(props.totalReservas);
    const [status, setStatus] = useState(validarStatus());

    useEffect(() => {
        registrar();
    }, []);

    //dependiendo de como venga este atributo lo definira con alguno de los roles previamente cargado
    const validarTipo = (tipo) => {
        resultado = TipoVehiculo.AUTO;

        switch (tipo) {
            case 'bicicleta':
                resultado = TipoVehiculo.BICICLETA;
                break;

            case 'moto':
                resultado = TipoVehiculo.MOTO;
                break;

            case 'camioneta':
                resultado = TipoVehiculo.CAMIONETA;
                break;

            default:
                break;
        }

        return resultado;
    }

    //si el usuario tiene <= 3 autos activo pasa hacer inactivo la nueva instancia
    const validarStatus = () => {
        const firebase = new Firebase();

        firebase.obtenerCantidadFilas('vehiculos', 'idUsuario', state.usuario.idUsuario)
            .then((cantidad) => {
                if (cantidad < 3) {
                    setStatus(StatusVehiculo.ACTIVO);
                } else {
                    setStatus(StatusVehiculo.INACTIVO);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }


    const modificarStatus = (status) => {
        let resultado = true;

        switch (status) {
            case 'activo':
                //valida que no tenga ya 3 vehiculos activos
                if (validarStatus() == StatusVehiculo.ACTIVO) {
                    setStatus(StatusVehiculo.ACTIVO);
                } else {
                    resultado = false;
                }
                break;

            case 'inactivo':
                setStatus(StatusVehiculo.INACTIVO);
                break;

            default:
                setStatus(StatusVehiculo.EN_PUESTO);
                break;
        }

        if (resultado) {
            resultado = actualizar();
        }

        return resultado;
    }

    //suma una reserva al vehiculo no importa el status final de la reserva, se suma al contador del vehiculo
    const sumarReserva = () => {
        let total = state.totalReservas++;

        setTotalReservas(total);
        return actualizar();
    }

    const registrar = (evento) => {
        evento.preventDefault();

        const { idVehiculo, usuario, marca, modelo, patente, tipo, color, totalReservas, status } = state;
        const firebase = new Firebase();
        let resultado = false;

        if (firebase.obtenerValorEnDB(`usuarios/${usuario.idUsuario}`)) {
            firebase.crearEnDBSinUid('vehiculos', {
                idVehiculo,
                usuario,
                marca,
                modelo,
                patente,
                tipo,
                color,
                totalReservas,
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
    };

    const actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        const { idVehiculo, totalReservas, status } = state;

        firebase.actualizarEnDBSinUid('vehiculos', 'idVehiculo', idVehiculo, {
            totalReservas,
            status
        })
            .then(() => {
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    const obtenerVehiculos = () => {
        const firebase = new Firebase();

        firebase.obtenerTodosEnDB('vehiculos')
            .then((data) => {
                const vehiculos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(vehiculos).map((key) => {
                    const vehiculo = vehiculos[key];
                    console.log(vehiculo.idVehiculo, vehiculo.usuario.nombre, vehiculo.usuario.apellido, vehiculo.marca, vehiculo.modelo, vehiculo.patente, vehiculo.tipo, vehiculo.color, vehiculo.totalReservas, vehiculo.status);
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

    //este nos servirá para traer un vehiculo en particular, por el idUsuario por ejemplo
    const obtenerVehiculosPorCampo = (filtro) => {
        const firebase = new Firebase();

        firebase.obtenerValorEnDB(`vehiculos/idUsuario/${filtro}`)
            .then((data) => {
                const vehiculos = data.val();

                // validamos que existan datos
                if (vehiculos) {
                    // Recorremos cada vehiculo y mostramos sus datos en la consola
                    Object.keys(vehiculos).map((key) => {
                        const vehiculo = vehiculos[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(vehiculo.idVehiculo, vehiculo.usuario.nombre, vehiculo.usuario.apellido, vehiculo.marca, vehiculo.modelo, vehiculo.patente, vehiculo.tipo, vehiculo.color, vehiculo.totalReservas, vehiculo.status);
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

}

export default Vehiculo;