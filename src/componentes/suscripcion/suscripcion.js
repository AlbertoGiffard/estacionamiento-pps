import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';

const StatusSuscripcion = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    MOROSO: 'MOROSO'
};

class Suscripcion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSuscripcion: uuid(),
            usuario: props.Usuario,
            diaCobro: props.diaCobro,
            valorCuota: props.valorCuota,
            status: StatusSuscripcion.ACTIVO,
            ultimoPago: props.ultimoPago,
            totalAbonado: props.totalAbonado,
        };
        this.registrar();
    }

    registrar = (evento) => {
        evento.preventDefault();

        const { idSuscripcion, usuario, diaCobro, valorCuota, status, totalAbonado, ultimoPago } = this.state;
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

    actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        let resultado = false;
        const { idSuscripcion, usuario, diaCobro, valorCuota, status, totalAbonado, ultimoPago } = this.state;

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

        return resultado;
    }

    obtenerSuscripciones = () => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerTodosEnDB('suscripciones')
            .then((data) => {
                const suscripciones = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(suscripciones).map((key) => {
                    const suscripcion = suscripciones[key];
                    console.log(suscripcion.idSuscripcion, suscripcion.usuario.nombre, suscripcion.diaCobro, suscripcion.valorCuota, suscripcion.status, suscripcion.totalAbonado, suscripcion.ultimoPago);
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

    //este nos servirá para traer una suscripcion en particular, por el idSuscripcion por ejemplo
    obtenerSuscripcionesPorCampo = (filtro) => {
        const firebase = new Firebase();
        let resultado = false;

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
            case 'activo':
                this.setState({ status: StatusSuscripcion.ACTIVO });
                break;

            case 'inactivo':
                this.setState({ status: StatusSuscripcion.INACTIVO });
                break;

            default:
                this.setState({ status: StatusSuscripcion.MOROSO });
                break;
        }

        return this.actualizar();
    }

    /* Sobrescribe todos los campos, aca la idea seria que si solo modifica un campo por ejemplo,  
    los demas campos sean los mismos, es decir pasarle los mismos datos que ya tenia */
    modificarCampos = (diaCobro, valorCuota) => {
        this.setState({
            diaCobro: diaCobro,
            valorCuota: valorCuota
        });

        return this.actualizar();
    }

    verificarSuscripcion = () => {
        const {ultimoPago, status, diaCobro} = this.state;
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

    cobrar = () => {
        const {valorCuota, totalAbonado} = this.state;
        const fechaActual = new Date();
        const nuevoTotalAbonado = totalAbonado + valorCuota;

        if (this.verificarSuscripcion()) {
            this.setState({ 
                ultimoPago: fechaActual,
                totalAbonado: nuevoTotalAbonado
            });

            this.actualizar();
        }
    }
}

export default Suscripcion;