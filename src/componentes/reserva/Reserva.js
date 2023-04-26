import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";


const TipoReserva = {
    HORA: 'HORA',
    SEMANA: 'SEMANA',
    MES: 'MES'
};

const StatusReserva = {
    POR_CONFIRMAR: 'POR_CONFIRMAR',
    CONFIRMADA: 'CONFIRMADA',
    CANCELADA: 'CANCELADA',
    SIN_RESPUESTA: 'SIN_RESPUESTA'
};

const StatusPago = {
    POR_PAGAR: 'POR_PAGAR',
    PAGADA: 'PAGADA',
    CANCELADA: 'CANCELADA'
};

const Reserva = (props) => {
    const [idReserva, setIdReserva] = useState(uuid());
    const [estacionamiento, setEstacionamiento] = useState(props.estacionamiento);
    const [usuario, setUsuario] = useState(props.usuario);
    const [vehiculo, setVehiculo] = useState(props.vehiculo);
    const [tipo, setTipo] = useState(verificarTipo(props.tipoReserva));
    const [fechaLlegada, setFechaLlegada] = useState(props.fechaLlegada);
    const [fechaSalida, setFechaSalida] = useState(props.fechaSalida);
    const [status, setStatus] = useState(StatusReserva.POR_CONFIRMAR);
    const [statusPago, setStatusPago] = useState(StatusPago.POR_PAGAR);
    const [descuento, setDescuento] = useState(props.descuento);
    const [total, setTotal] = useState(props.total);

    useEffect(() => {
        registrar();
    }, []);


    //Dependiendo de coomo venga este atributo lo definira con alguno de los tipos previamente cargado
    const verificarTipo = (tipoReserva) => {
        resultado = TipoReserva.MES;

        switch (tipoReserva) {
            case 'hora':
                resultado = TipoReserva.HORA;
                break;

            case 'semana':
                resultado = TipoReserva.SEMANA;
                break;

            default:
                break;
        }

        return resultado;
    }

    const registrar = (evento) => {
        evento.preventDefault();

        const { idReserva, estacionamiento, usuario, vehiculo, tipo, fechaLlegada, fechaSalida, status, statusPago, descuento, total } = state;
        const firebase = new Firebase();
        let resultado = false;

        firebase.crearEnDBSinUid('reservas', {
            idReserva,
            estacionamiento,
            usuario,
            vehiculo,
            tipo,
            fechaLlegada,
            fechaSalida,
            status,
            statusPago,
            descuento,
            total
        })
            .then(() => {
                resultado = true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    };

    const actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        const { idReserva, vehiculo, fechaLlegada, fechaSalida, status, statusPago, descuento, total } = state;

        firebase.actualizarEnDBSinUid('reservas', 'idReserva', idReserva, {
            vehiculo,
            fechaLlegada,
            fechaSalida,
            status,
            statusPago,
            descuento,
            total
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

    const obtenerReservas = () => {
        const firebase = new Firebase();

        firebase.obtenerTodosEnDB('reservas')
            .then((data) => {
                const reservas = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(reservas).map((key) => {
                    const reserva = reservas[key];
                    console.log(reserva.idReserva, reserva.estacionamiento.nombre, reserva.usuario.nombre, reserva.vehiculo.patente, reserva.tipo, reserva.fechaLlegada, reserva.fechaSalida, reserva.status, reserva.statusPago, reserva.descuento, reserva.total);
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

    //Este nos servirá para traer una reserva en particular, por el idReserva por ejemplo
    const obtenerReservasPorCampo = (filtro) => {
        const firebase = new Firebase();

        firebase.obtenerValorEnDB(`reservas/${filtro}`)
            .then((data) => {
                const reservas = data.val();

                // validamos que existan datos
                if (reservas) {
                    // Recorremos cada vehiculo y mostramos sus datos en la consola
                    Object.keys(reservas).map((key) => {
                        const reserva = reservas[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(reserva.idReserva, reserva.estacionamiento.nombre, reserva.usuario.nombre, reserva.vehiculo.patente, reserva.tipo, reserva.fechaLlegada, reserva.fechaSalida, reserva.status, reserva.statusPago, reserva.descuento, reserva.total);
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
            case 'confirmada':
                setStatus(StatusReserva.CONFIRMADA);
                break;

            case 'cancelada':
                setStatus(StatusReserva.CANCELADA);
                break;

            case 'sin_respuesta':
                setStatus(StatusReserva.SIN_RESPUESTA);
                break;

            default:
                setStatus(StatusReserva.POR_CONFIRMAR);
                break;
        }

        return actualizar();
    }

    const modificarPago = (statusPago) => {
        switch (statusPago) {
            case 'pagada':
                setStatus(StatusPago.PAGADA);
                break;
    
            case 'cancelada':
                setStatus(StatusPago.CANCELADA);
                break;
    
            default:
                setStatus(StatusPago.POR_PAGAR);
                break;
        }
    
        return actualizar();
    }

    //El conDescuento nos indicara si se le aplica o no, sera un boolean
    const totalReserva = (conDescuento) => {
        const { descuento, total } = state;
        let totalAPagar;

        if (conDescuento) {
            totalAPagar = total - (total * descuento / 100);
        } else {
            totalAPagar = total;
        }

        setTotal(totalAPagar);
        actualizar()
            .then(() => {
                return state.total;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }
}

export default Reserva;