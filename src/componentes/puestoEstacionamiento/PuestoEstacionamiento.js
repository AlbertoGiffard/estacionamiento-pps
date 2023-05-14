import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";

export const StatusPuesto = {
    LIBRE: 'LIBRE',
    OCUPADO: 'OCUPADO',
    INACTIVO: 'INACTIVO'
};

class PuestoEstacionamiento extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idPuesto: uuid(),
            idEstacionamiento: props.idEstacionamiento,
            vehiculo: props.vehiculo,
            status: StatusPuesto.LIBRE,
            tipoVehiculos: props.tipoVehiculos,
        };
    }


    //valido si fue cargada esta instancia con un vehiculo o vino el dato como nulo
    validarStatus = (vehiculo) => {
        if (vehiculo) {
            return StatusPuesto.OCUPADO;
        } else {
            return StatusPuesto.LIBRE;
        }
    };

    //Si modifico por libre o inactivo tengo que dejar el atributo vehiculo como vacio
    modificarStatus = (status, vehiculo) => {
        let resultado = true;

        switch (status) {
            case 'libre':
                this.setState({ status: StatusPuesto.LIBRE });
                this.setState({ vehiculo: null });
                break;

            case 'ocupado':
                if (vehiculo) {
                    this.setState({ status: StatusPuesto.OCUPADO });
                    this.setState({ vehiculo: vehiculo });
                } else {
                    resultado = false;
                }
                break;

            default:
                this.setState({ status: StatusPuesto.INACTIVO });
                this.setState({ vehiculo: null });
                break;
        }

        return resultado;
    }

    registrar = () => {
        const { idPuesto, idEstacionamiento, vehiculo, status, tipoVehiculos } = this.state;
        const firebase = new Firebase();

        return firebase.crearEnDBSinUid('puestosEstacionamientos', {
            idPuesto,
            idEstacionamiento,
            vehiculo,
            status,
            tipoVehiculos
        })
            .then(() => {
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    };

    actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        const { idPuesto, idEstacionamiento, vehiculo, status, tipoVehiculos } = this.state;

        firebase.actualizarEnDBSinUid('puestosEstacionamientos', 'idPuesto', idPuesto, {
            vehiculo,
            status,
            tipoVehiculos
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

    obtenerPuestos = () => {
        const firebase = new Firebase();

        firebase.obtenerTodosEnDB('puestosEstacionamientos')
            .then((data) => {
                const puestos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(puestos).map((key) => {
                    const puesto = puestos[key];
                    console.log(puesto.idPuesto, puesto.idEstacionamiento, puesto.vehiculo, puesto.status, puesto.tipoVehiculos);
                });

                // Redireccionamos al usuario a otra página después de obtener los puestos
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    //este nos servirá para traer un puesto en particular, por el idEstacionamiento por ejemplo
    obtenerPuestosPorCampo = (filtro) => {
        const firebase = new Firebase();

        firebase.obtenerValorEnDB(`puestosEstacionamientos/idEstacionamiento/${filtro}`)
            .then((data) => {
                const puestos = data.val();

                // validamos que existan datos
                if (puestos) {
                    // Recorremos cada puesto y mostramos sus datos en la consola
                    Object.keys(puestos).map((key) => {
                        const puesto = puestos[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(puesto.idPuesto, puesto.idEstacionamiento, puesto.vehiculo, puesto.status, puesto.tipoVehiculos);
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

export default PuestoEstacionamiento;