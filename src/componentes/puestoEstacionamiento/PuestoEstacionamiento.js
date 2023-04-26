import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";

const StatusPuesto = {
    LIBRE: 'LIBRE',
    OCUPADO: 'OCUPADO',
    INACTIVO: 'INACTIVO'
};

const PuestoEstacionamiento = (props) => {
    const [idPuesto, setIdPuesto] = useState(uuid());
    const [idEstacionamiento, setIdEstacionamiento] = useState(props.estacionamiento.idEstacionamiento);
    const [vehiculo, setVehiculo] = useState(props.vehiculo);
    const [status, setStatus] = useState(validarStatus(props.vehiculo));
    const [tipoVehiculos, setTipoVehiculos] = useState(props.tipoVehiculos);

    useEffect(() => {
        registrar();
    }, []);

    //valido si fue cargada esta instancia con un vehiculo o vino el dato como nulo
    const validarStatus = (vehiculo) => {
        if (vehiculo) {
            return StatusPuesto.OCUPADO;
        } else {
            return StatusPuesto.LIBRE;
        }
    };

    //Si modifico por libre o inactivo tengo que dejar el atributo vehiculo como vacio
    const modificarStatus = (status, vehiculo) => {
        let resultado = true;

        switch (status) {
            case 'libre':
                setStatus(StatusPuesto.LIBRE);
                setVehiculo(null);
                break;

            case 'ocupado':
                if (vehiculo) {
                    setStatus(StatusPuesto.OCUPADO);
                    setVehiculo(vehiculo);
                } else {
                    resultado = false;
                }
                break;

            default:
                setStatus(StatusPuesto.INACTIVO);
                setVehiculo(null);
                break;
        }

        return resultado;
    }

    const registrar = () => {
        const { idPuesto, idEstacionamiento, vehiculo, status, tipoVehiculos } = state;
        const firebase = new Firebase();

        firebase.crearEnDBSinUid('puestosEstacionamientos', {
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
        const { idPuesto, idEstacionamiento, vehiculo, status, tipoVehiculos } = state;

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

    const obtenerPuestos = () => {
        const firebase = new Firebase();
        const history = useHistory();

        firebase.obtenerTodosEnDB('puestosEstacionamientos')
            .then((data) => {
                const puestos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(puestos).map((key) => {
                    const puesto = puestos[key];
                    console.log(puesto.idPuesto, puesto.idEstacionamiento, puesto.vehiculo, puesto.status, puesto.tipoVehiculos);
                });

                // Redireccionamos al usuario a otra página después de obtener los puestos
                history.push('/otra-pagina');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    //este nos servirá para traer un puesto en particular, por el idEstacionamiento por ejemplo
    const obtenerPuestosPorCampo = (filtro) => {
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

        return resultado;
    }

}

export default PuestoEstacionamiento;