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
    }

    //dependiendo de coomo venga este atributo lo definira con alguno de los roles previamente cargado
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
        const vehiculosRef = database.ref('vehiculos');
        const vehiculosUsuarioRef = vehiculosRef.orderByChild('Usuario/idUsuario').equalTo('123');

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

}

export default Vehiculo;