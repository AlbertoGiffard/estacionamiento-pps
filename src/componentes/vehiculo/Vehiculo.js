import React, { Component } from 'react';
import Firebase from '../firebase/Firebase';


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
            id: props.id,
            idVehiculo: props.idVehiculo,
            usuario: props.usuario,
            marca: props.marca,
            modelo: props.modelo,
            patente: props.patente,
            tipo: props.tipo,
            color: props.color,
            totalReservas: props.totalReservas,
            status: props.status,
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
                console.error(errorCode, errorMessage);
            });
    }


    modificarStatus = (status) => {
        let resultado = true;

        switch (status) {
            case 'activo':
                //valida que no tenga ya 3 vehiculos activos
                if (this.validarStatus() === StatusVehiculo.ACTIVO) {
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
        let total = this.state.totalReservas + 1;

        this.setState({ totalReservas: total });
        return this.actualizar();
    }

    registrar = () => {
        const firebase = new Firebase();  
        
        return firebase.crearEnDBSinUid("vehiculos", this.state)
            .then(() => {
                return Promise.resolve(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                return Promise.resolve(false);
            });
    };

    actualizar = () => {
        const firebase = new Firebase();
        const {
            id,
            idVehiculo,
            totalReservas,
            status
        } = this.state;

        return firebase.actualizarEnDB(id, 'vehiculos', this.state)
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