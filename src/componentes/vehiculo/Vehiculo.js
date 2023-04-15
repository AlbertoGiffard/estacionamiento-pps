import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';


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

class Vehiculo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idVehiculo: uuid(),
            usuario: props.Usuario,
            marca: props.marca,
            modelo: props.modelo,
            patente: props.patente,
            tipo: validarTipo(props.tipoVehiculo),
            color: props.color,
            totalReservas: props.totalReservas,
            status: validarStatus()
        };
        this.registrar();
    }

    //dependiendo de como venga este atributo lo definira con alguno de los roles previamente cargado
    validarTipo = (tipo) => {
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
    validarStatus = () => {
        let resultado = null;
        const firebase = new Firebase();

        firebase.obtenerCantidadFilas('vehiculos', 'idUsuario', this.state.usuario.idUsuario)
            .then((cantidad) => {
                if (cantidad < 3) {
                    resultado = StatusVehiculo.ACTIVO;
                } else {
                    resultado = StatusVehiculo.INACTIVO;
                }
                return resultado;
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
        let total = this.state.totalReservas++;

        this.setState({ totalReservas: total });
        return this.actualizar();
    }

    registrar = (evento) => {
        evento.preventDefault();

        const { idVehiculo, usuario, marca, modelo, patente, tipo, color, totalReservas, status } = this.state;
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

        return resultado;
    };

    actualizar = () => {
        const firebase = new Firebase();
        let resultado = false;
        const { idVehiculo, totalReservas, status } = this.state;

        firebase.actualizarEnDBSinUid('vehiculos', 'idVehiculo', idVehiculo, {
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

        return resultado;
    }

    obtenerVehiculos = () => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerTodosEnDB('vehiculos')
            .then((data) => {
                const vehiculos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(vehiculos).map((key) => {
                    const vehiculo = vehiculos[key];
                    console.log(vehiculo.idVehiculo, vehiculo.usuario.nombre, vehiculo.usuario.apellido, vehiculo.marca, vehiculo.modelo, vehiculo.patente, vehiculo.tipo, vehiculo.color, vehiculo.totalReservas, vehiculo.status);
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

    //este nos servirá para traer un vehiculo en particular, por el idUsuario por ejemplo
    obtenerVehiculosPorCampo = (filtro) => {
        const firebase = new Firebase();
        let resultado = false;

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

}

export default Vehiculo;