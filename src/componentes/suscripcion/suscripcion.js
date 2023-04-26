import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";

const StatusSuscripcion = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    MOROSO: 'MOROSO'
};

const Suscripcion = (props) => {
    const [idSuscripcion, setIdSuscripcion] = useState(uuid());
    const [usuario, setUsuario] = useState(props.usuario);
    const [diaCobro, setDiaCobro] = useState(props.diaCobro);
    const [valorCuota, setValorCuota] = useState(props.valorCuota);
    const [status, setStatus] = useState(StatusSuscripcion.ACTIVO);
    const [ultimoPago, setUltimoPago] = useState(props.ultimoPago);
    const [totalAbonado, setTotalAbonado] = useState(props.totalAbonado);

    useEffect(() => {
        registrar();
    }, []);

    const registrar = (evento) => {
        evento.preventDefault();

        const { idSuscripcion, usuario, diaCobro, valorCuota, status, totalAbonado, ultimoPago } = state;
        const firebase = new Firebase();
        let resultado = false;

        firebase.crearEnDBSinUid('suscripciones', {
            idSuscripcion,
            usuario,
            diaCobro,
            valorCuota,
            status,
            totalAbonado,
            ultimoPago
        })
            .then(() => {
                resultado = true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });

        return resultado;
    };

    const actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        const { idSuscripcion, usuario, diaCobro, valorCuota, status, totalAbonado, ultimoPago } = state;

        firebase.actualizarEnDBSinUid('suscripciones', 'idSuscripcion', idSuscripcion, {
            usuario,
            diaCobro,
            valorCuota,
            status,
            totalAbonado,
            ultimoPago
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

    const obtenerSuscripciones = () => {
        const firebase = new Firebase();

        firebase.obtenerTodosEnDB('suscripciones')
            .then((data) => {
                const suscripciones = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(suscripciones).map((key) => {
                    const suscripcion = suscripciones[key];
                    console.log(suscripcion.idSuscripcion, suscripcion.usuario.nombre, suscripcion.diaCobro, suscripcion.valorCuota, suscripcion.status, suscripcion.totalAbonado, suscripcion.ultimoPago);
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

    //este nos servirá para traer una suscripcion en particular, por el idSuscripcion por ejemplo
    const obtenerSuscripcionesPorCampo = (filtro) => {
        const firebase = new Firebase();

        firebase.obtenerValorEnDB(`suscripciones/${filtro}`)
            .then((data) => {
                const suscripciones = data.val();

                // validamos que existan datos
                if (suscripciones) {
                    // Recorremos cada puesto y mostramos sus datos en la consola
                    Object.keys(suscripciones).map((key) => {
                        const suscripcion = suscripciones[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(suscripcion.idSuscripcion, suscripcion.usuario.nombre, suscripcion.diaCobro, suscripcion.valorCuota, suscripcion.status, suscripcion.totalAbonado, suscripcion.ultimoPago);
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

    const modificarStatus = (status) => {
        switch (status) {
            case 'activo':
                setStatus(StatusSuscripcion.ACTIVO);
                break;

            case 'inactivo':
                setStatus(StatusSuscripcion.INACTIVO);
                break;

            default:
                setStatus(StatusSuscripcion.MOROSO);
                break;
        }

        return actualizar();
    }

    /* Sobrescribe todos los campos, aca la idea seria que si solo modifica un campo por ejemplo,  
    los demas campos sean los mismos, es decir pasarle los mismos datos que ya tenia */
    const modificarCampos = (diaCobro, valorCuota) => {
        setDiaCobro(diaCobro);
        setValorCuota(valorCuota);

        return actualizar();
    }

    const verificarSuscripcion = () => {
        const { ultimoPago, status, diaCobro } = state;
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth();
        const diaVigente = fechaActual.getDate();
        const mesUltimoPago = new Date(ultimoPago).getMonth();
        let resultado = false;

        //Valido que no sea un usuario inactivo
        if (status != StatusSuscripcion.INACTIVO) {
            //Que no se le haya cobrado ya este mes
            if (mesUltimoPago != mesActual) {
                //Que el dia de hoy sea mayor a su dia de cobro mensual
                if (diaVigente >= diaCobro) {
                    resultado = true;
                }
            }
        }

        return resultado;
    }

    const cobrar = () => {
        const { valorCuota, totalAbonado } = state;
        const fechaActual = new Date();
        const nuevoTotalAbonado = totalAbonado + valorCuota;

        if (verificarSuscripcion()) {
            setUltimoPago(fechaActual);
            setTotalAbonado(nuevoTotalAbonado);
            actualizar();
        }
    }
}

export default Suscripcion;