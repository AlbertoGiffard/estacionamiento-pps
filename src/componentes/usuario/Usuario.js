import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

const StatusUsuario = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    LISTA_NEGRA: 'LISTA_NEGRA',
    SIN_SUSCRIPCION: 'SIN_SUSCRIPCION'
};

const Roles = {
    ADMIN: 'ADMIN',
    DUENIO: 'DUENIO',
    EMPLEADO: 'EMPLEADO',
    CLIENTE: 'CLIENTE'
};

class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: uuid(),
            nombre: props.nombre,
            apellido: props.apellido,
            dni: props.dni,
            email: props.email,
            contrasenia: props.contrasenia,
            telefono: props.telefono,
            direccion: props.direccion,
            rol: verificarRol(props.rol),
            fechaAlta: new Date(),
            foto: props.foto,
            idEstacionamiento: props.idEstacionamiento,
            status: StatusUsuario.ACTIVO
        };
    }

    //dependiendo de coomo venga este atributo lo definira con alguno de los roles previamente cargado
    verificarRol = (rol) => {
        resultado = Roles.CLIENTE;

        switch (rol) {
            case 'admin':
                resultado = Roles.ADMIN;
                break;

            case 'duenio':
                resultado = Roles.DUENIO;
                break;

            case 'empleado':
                resultado = Roles.EMPLEADO;
                break;

            default:
                break;
        }

        return resultado;
    }

    modificarStatus = (status) => {
        switch (status) {
            case 'activo':
                this.setState({ status: StatusUsuario.ACTIVO});
                break;

            case 'inactivo':
                this.setState({ status: StatusUsuario.INACTIVO});
                break;

            case 'lista_negra':
                this.setState({ status: StatusUsuario.LISTA_NEGRA});
                break;

            default:
                this.setState({ status: StatusUsuario.SIN_SUSCRIPCION});
                break;
        }

    }

    /* Sobrescribe todos los campos, aca la idea seria que si solo modifica el email por ejemplo,  
    los demas campos sean los mismos, es decir pasarle los mismos datos que ya tenia */    
    modificarCampos = (email, contrasenia, telefono, foto) => {
        this.setState({ 
            email: email, 
            contrasenia: contrasenia, 
            telefono: telefono, 
            foto: foto
        });
    }
    
    /* iniciarSesion(email, contrasenia) */
    /* validarEmail(email) */
    /* cerrarSesion() */
    /* registrarse() */

    render() {
        // Código JSX para renderizar el componente
        return (
            <div>
                <p>Atributo 1: {this.state.atributo1}</p>
                <p>Atributo 2: {this.state.atributo2}</p>
                <p>Resultado operación 1: {this.operacion1()}</p>
                <p>Resultado operación 2: {this.operacion2(5)}</p>
            </div>
        );
    }
}

export default Usuario;