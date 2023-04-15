import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';


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

class Reserva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idReserva: uuid(),
            estacionamiento: props.estacionamiento,
            usuario: props.usuario,
            vehiculo: props.vehiculo,
            tipo: Reserva.verificarTipo(props.tipoReserva),
            fechaLlegada: props.fechaLlegada,
            fechaSalida: props.fechaSalida,
            status: StatusReserva.POR_CONFIRMAR,
            statusPago: StatusPago.POR_PAGAR,
            descuento: props.descuento,
            total: props.total
        };
    }

    //Dependiendo de coomo venga este atributo lo definira con alguno de los tipos previamente cargado
    static verificarTipo = (tipoReserva) => {
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

    registrar = (evento) => {
        evento.preventDefault();

        const { idReserva, estacionamiento, usuario, vehiculo, tipo, fechaLlegada, fechaSalida, status, statusPago, descuento, total } = this.state;
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

        return resultado;
    };

    actualizar = () => {
        const firebase = new Firebase();
        let resultado = false;
        const { idReserva, vehiculo, fechaLlegada, fechaSalida, status, statusPago, descuento, total } = this.state;

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
                resultado = true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });

        return resultado;
    }

    obtenerReservas = () => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerTodosEnDB('reservas')
            .then((data) => {
                const reservas = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(reservas).map((key) => {
                    const reserva = reservas[key];
                    console.log(reserva.idReserva, reserva.estacionamiento.nombre, reserva.usuario.nombre, reserva.vehiculo.patente, reserva.tipo, reserva.fechaLlegada, reserva.fechaSalida, reserva.status, reserva.statusPago, reserva.descuento, reserva.total);
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

    //Este nos servirá para traer una reserva en particular, por el idReserva por ejemplo
    obtenerReservasPorCampo = (filtro) => {
        const firebase = new Firebase();
        let resultado = false;

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

    modificarStatus = (status) => {
        switch (status) {
            case 'confirmada':
                this.setState({ status: StatusReserva.CONFIRMADA });
                break;

            case 'cancelada':
                this.setState({ status: StatusReserva.CANCELADA });
                break;

            case 'sin_respuesta':
                this.setState({ status: StatusReserva.SIN_RESPUESTA });
                break;

            default:
                this.setState({ status: StatusReserva.POR_CONFIRMAR });
                break;
        }

        return this.actualizar();
    }

    modificarPago = (statusPago) => {
        switch (statusPago) {
            case 'pagada':
                this.setState({ status: StatusPago.PAGADA });
                break;

            case 'cancelada':
                this.setState({ status: StatusPago.CANCELADA });
                break;

            default:
                this.setState({ status: StatusPago.POR_PAGAR });
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

        this.setState({ total: totalAPagar });
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