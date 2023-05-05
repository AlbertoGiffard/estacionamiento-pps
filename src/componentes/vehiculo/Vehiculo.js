import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";


export const TipoVehiculo = {
    BICICLETA: 'BICICLETA',
    MOTO: 'MOTO',
    AUTO: 'AUTO',
    CAMIONETA: 'CAMIONETA'
};

export const StatusVehiculo = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    EN_PUESTO: 'EN_PUESTO'
};

class Vehiculo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idVehiculo: props.idVehiculo,
            usuario: props.Usuario,
            marca: props.marca,
            modelo: props.modelo,
            patente: props.patente,
            tipo: props.tipoVehiculo,
            color: props.color,
            totalReservas: props.totalReservas,
            status: props.statusVehiculo,
        };
    }

    /* useEffect(() => {
        registrar();
    }, []); */

    //dependiendo de como venga este atributo lo definira con alguno de los roles previamente cargado
    validarTipo = (tipo) => {
        let resultado = TipoVehiculo.AUTO;

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
    validarStatus = () => {
        const firebase = new Firebase();
        const {
            usuario
        } = this.state;

        firebase.obtenerCantidadFilas('vehiculos', 'idUsuario', usuario.idUsuario)
            .then((cantidad) => {
                if (cantidad < 3) {
                    this.setState({ status: StatusVehiculo.ACTIVO });
                } else {
                    this.setState({ status: StatusVehiculo.INACTIVO });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }


    modificarStatus = (status) => {
        let resultado = true;

        switch (status) {
            case 'activo':
                //valida que no tenga ya 3 vehiculos activos
                if (this.validarStatus() == StatusVehiculo.ACTIVO) {
                    this.setState({ status: StatusVehiculo.ACTIVO });
                } else {
                    resultado = false;
                }
                break;

            case 'inactivo':
                this.setState({ status: StatusVehiculo.INACTIVO });
                break;

            default:
                this.setState({ status: StatusVehiculo.EN_PUESTO });
                break;
        }

        if (resultado) {
            resultado = this.actualizar();
        }

        return resultado;
    }

    //suma una reserva al vehiculo no importa el status final de la reserva, se suma al contador del vehiculo
    sumarReserva = () => {
        const { totalReservas } = this.state;
        let total = totalReservas++;

        this.setState({ totalReservas: total });
        return this.actualizar();
    }

    registrar = (evento) => {
        evento.preventDefault();

        const {
            idVehiculo,
            usuario,
            marca,
            modelo,
            patente,
            tipo,
            color,
            totalReservas,
            status
        } = this.state;
        const firebase = new Firebase();

        firebase.obtenerValorEnDB("usuarios", { idUsuario: usuario.idUsuario })
            .then((usuarioEncontrado) => {
                // Si el usuario existe, crear el vehículo
                if (usuarioEncontrado) {
                    firebase.crearEnDB(idVehiculo, "vehiculos", {
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
                            return Promise.resolve(true);
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.error(errorMessage);
                            return Promise.resolve(false);
                        });
                } else {
                    console.error("El usuario no existe en la base de datos.");
                    return Promise.resolve(false);
                }
            })
            .catch((error) => {
                console.error(error);
                return Promise.resolve(false);
            });
    };

    actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        const  {
            idVehiculo,
            totalReservas,
            status
        } = this.state;

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

    obtenerVehiculos = () => {
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
    obtenerVehiculosPorCampo = (filtro) => {
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