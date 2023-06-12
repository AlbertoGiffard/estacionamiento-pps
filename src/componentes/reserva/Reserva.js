import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { useState, useEffect } from "react";


export const TipoReserva = {
    HORA: 'HORA',
    SEMANA: 'SEMANA',
    MES: 'MES'
};

export const StatusReserva = {
    POR_CONFIRMAR: 'POR_CONFIRMAR',
    CONFIRMADA: 'CONFIRMADA',
    CANCELADA: 'CANCELADA',
    SIN_RESPUESTA: 'SIN_RESPUESTA',
    FINALIZADA: 'FINALIZADA'
};

export const StatusPago = {
    POR_PAGAR: 'POR_PAGAR',
    PAGADA: 'PAGADA',
    CANCELADA: 'CANCELADA'
};

class Reserva extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idReserva: uuid(),
            estacionamiento: props.estacionamiento,
            usuario: props.usuario,
            vehiculo: props.vehiculo,
            tipo: props.tipo,
            fechaLlegada: props.fechaLlegada,
            fechaSalida: props.fechaSalida,
            horaCreacion: Date.now(),
            status: StatusReserva.POR_CONFIRMAR,
            statusPago: StatusPago.POR_PAGAR,
            descuento: props.descuento,
            total: props.total
        };
    }


    //Dependiendo de coomo venga este atributo lo definira con alguno de los tipos previamente cargado
    verificarTipo = (tipoReserva) => {
        let resultado = TipoReserva.MES;

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

    registrar = () => {
        const { idReserva, estacionamiento, usuario, vehiculo, tipo, fechaLlegada, fechaSalida, status, statusPago, descuento, total } = this.state;
        const firebase = new Firebase();
        let resultado = false;

        return firebase.crearEnDBSinUid('reservas', {
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

    static actualizar = (reserva) => {
        const firebase = new Firebase();
        const { idReserva } = reserva;
        return firebase.actualizarEnDBSinUid('reservas', 'idReserva', idReserva, reserva)
            .then(() => {
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    obtenerReservas = () => {
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
    obtenerReservasPorCampo = (filtro) => {
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

    modificarStatus = (status) => {
        switch (status) {
            case 'confirmada':
                this.state = {
                    status: StatusReserva.CONFIRMADA
                };
                break;

            case 'cancelada':
                this.state = {
                    status: StatusReserva.CANCELADA
                };
                break;

            case 'sin_respuesta':
                this.state = {
                    status: StatusReserva.SIN_RESPUESTA
                };
                break;

            default:
                this.state = {
                    status: StatusReserva.POR_CONFIRMAR
                };
                break;
        }

        return this.actualizar();
    }

    modificarPago = (statusPago) => {
        switch (statusPago) {
            case 'pagada':
                this.state = {
                    statusPago: StatusPago.PAGADA
                };
                break;

            case 'cancelada':
                this.state = {
                    statusPago: StatusPago.CANCELADA
                };
                break;

            default:
                this.state = {
                    statusPago: StatusPago.POR_PAGAR
                };
                break;
        }

        return this.actualizar();
    }

    //El conDescuento nos indicara si se le aplica o no, sera un boolean
    totalReserva = (conDescuento) => {
        const { descuento, total } = this.state;
        let totalAPagar;

        if (conDescuento) {
            totalAPagar = total - (total * descuento / 100);
        } else {
            totalAPagar = total;
        }

        this.state = {
            total: totalAPagar
        };
        this.actualizar()
            .then(() => {
                return this.state.total;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }
}

export default Reserva;