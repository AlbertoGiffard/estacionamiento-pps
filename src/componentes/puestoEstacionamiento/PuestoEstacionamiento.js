import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';

const StatusPuesto = {
    LIBRE: 'LIBRE',
    OCUPADO: 'OCUPADO',
    INACTIVO: 'INACTIVO'
};

class PuestoEstacionamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idPuesto: uuid(),
            idEstacionamiento: props.estacionamiento.idEstacionamiento,
            vehiculo: props.vehiculo,
            status: validarStatus(props.vehiculo),
            tipoVehiculos: props.tipoVehiculos
        };
        this.registrar();
    }

    //valido si fue cargada esta instancia con un vehiculo o vino el dato como nulo
    validarStatus = (vehiculo) => {
        let resultado = StatusPuesto.LIBRE;

        if (vehiculo) {
            resultado = StatusPuesto.OCUPADO;
        }

        return resultado;
    }

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

    registrar = (evento) => {
        evento.preventDefault();

        const { idPuesto, idEstacionamiento, vehiculo, status, tipoVehiculos } = this.state;
        const firebase = new Firebase();
        let resultado = false;

        firebase.crearEnDBSinUid('puestosEstacionamientos', {
            idPuesto,
            idEstacionamiento,
            vehiculo,
            status,
            tipoVehiculos
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
        const { idPuesto, idEstacionamiento, vehiculo, status, tipoVehiculos } = this.state;

        firebase.actualizarEnDBSinUid('puestosEstacionamientos', 'idPuesto', this.state.idPuesto, {
            vehiculo,
            status,
            tipoVehiculos
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
    
    obtenerPuestos = () => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerTodosEnDB('puestosEstacionamientos')
            .then((data) => {
                const puestos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(puestos).map((key) => {
                    const puesto = puestos[key];
                    console.log(puesto.idPuesto, puesto.idEstacionamiento, puesto.vehiculo, puesto.status, puesto.tipoVehiculos);
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

    //este nos servirá para traer un puesto en particular, por el idEstacionamiento por ejemplo
    obtenerPuestosPorCampo = (filtro) => {
        const firebase = new Firebase();
        let resultado = false;

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

export default PuestoEstacionamiento;