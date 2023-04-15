import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import { PuestoEstacionamiento, StatusPuesto } from '../puestoEstacionamiento/PuestoEstacionamiento';
import { Map, GoogleApiWrapper } from 'google-maps-react';


const StatusEstacionamiento = {
    PENDIENTE: 'PENDIENTE',
    RECHAZADO: 'RECHAZADO',
    INACTIVO: 'INACTIVO',
    ACTIVO: 'ACTIVO'
};

class Estacionamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idEstacionamiento: uuid(),
            nombre: props.nombre,
            duenio: props.usuario,
            direccion: props.direccion, //array de clave-valor
            disponibilidadMax: props.disponibilidadMax,
            puestosDisponibles: props.puestosDisponibles,
            tiposEstadia: props.tiposEstadia, 
            //TIPOS DE ESTADIA
            /* {
                hora: {
                    monto: Float,
                    descuento: Float
                },
                semana: {
                    monto: Float,
                    descuento: Float
                },
                mes: {
                    monto: Float,
                    descuento: Float
                }
            } */
            status: StatusEstacionamiento.PENDIENTE
        };
        this.registrar();
    }

    //Suma (y crea) la cantidad de puestos disponibles que se le indique
    agregarPuestos = (cantidad, tipoVehiculos) => {
        const { estacionamiento } = this.state;
        const nuevosPuestos = [];
        const firebase = new Firebase();

        if (cantidad > 0 && cantidad < this.state.disponibilidadMax) {
            for (let i = 0; i < cantidad; i++) {
                const puesto = (
                    <PuestoEstacionamiento
                        key={i}
                        estacionamiento={estacionamiento}
                        tipoVehiculos={tipoVehiculos}
                    />
                );
                nuevosPuestos.push(puesto);
            }

            this.setState((prevState) => ({
                ...prevState,
                puestosDisponibles: prevState.puestosDisponibles.concat(nuevosPuestos),
            }));

            // Obtiene los puestos existentes y actualiza su estado
            firebase
                .obtenerPuestosEstacionamientoPorEstacionamiento(this.idEstacionamiento)
                .then((puestosExistentes) => {
                    const puestosActualizados = puestosExistentes.map((puesto) => {
                        return {
                            ...puesto,
                            status: StatusPuesto.LIBRE,
                            vehiculo: null
                        };
                    });

                    // Actualiza el estado de los puestos de estacionamiento
                    this.setState((prevState) => ({
                        ...prevState,
                        puestosEstacionamiento: puestosActualizados.concat(nuevosPuestos)
                    }));

                    // Guarda los puestos actualizados en la base de datos
                    firebase.crearEnDBSinUid('puestosEstacionamientos', puestosActualizados);
                });
            this.actualizar();
        } else {
            console.log('la cantidad no es un numero positivo o supera la disponibilidad Max');
        }

    }

    restarPuestos = (cantidad) => {
        const firebase = new Firebase();
        const { idEstacionamiento, puestosDisponibles } = this.state;
        // Resta la cantidad de puestos del estacionamiento
        const nuevosPuestosDisponibles = puestosDisponibles - cantidad;

        if (cantidad > puestosDisponibles) {
            console.error('No hay suficientes puestos de estacionamiento para restar.');
            return;
        }

        this.setState({ puestosDisponibles: nuevosPuestosDisponibles });

        // Obtiene los puestos del estacionamiento
        firebase.obtenerPuestosEstacionamientoPorEstacionamiento(this.id)
            .then((puestos) => {
                // Filtra los puestos que están libres y los marca como inactivos
                const puestosLibres = puestos.filter((puesto) => puesto.status === StatusPuesto.LIBRE);
                const updates = {};
                puestosLibres.forEach((puesto) => {
                    updates[`puestosEstacionamientos/${puesto.idPuesto}/status`] = StatusPuesto.INACTIVO;
                });

                // Actualiza los puestos en Firebase
                return firebase.database.ref().update(updates);
            })
            .catch((error) => {
                console.error(error);
            });

        this.actualizar();
    }

    modificarStatus = (status) => {
        switch (status) {
            case 'pendiente':
                this.setState({ status: StatusEstacionamiento.PENDIENTE });
                break;

            case 'rechazado':
                this.setState({ status: StatusEstacionamiento.RECHAZADO });
                break;

            case 'inactivo':
                this.setState({ status: StatusEstacionamiento.INACTIVO });
                break;

            default:
                this.setState({ status: StatusEstacionamiento.ACTIVO });
                break;
        }

        return this.actualizar();
    }

    registrar = (evento) => {
        evento.preventDefault();

        const { idEstacionamiento, nombre, duenio, direccion, disponibilidadMax, puestosDisponibles, tiposEstadia, status } = this.state;
        const firebase = new Firebase();
        let resultado = false;

        firebase.crearEnDBSinUid('estacionamientos', {
            idEstacionamiento,
            nombre,
            duenio,
            direccion,
            disponibilidadMax,
            puestosDisponibles,
            tiposEstadia,
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
    };

    actualizar = (evento) => {
        evento.preventDefault();
        const firebase = new Firebase();
        let resultado = false;
        const { idEstacionamiento, nombre, duenio, direccion, disponibilidadMax, puestosDisponibles, tiposEstadia, status } = this.state;

        firebase.actualizarEnDBSinUid('estacionamientos', 'idEstacionamiento', idEstacionamiento, {
            duenio,
            direccion,
            disponibilidadMax,
            puestosDisponibles,
            tiposEstadia,
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


    obtenerEstacionamientos = () => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerTodosEnDB('estacionamientos')
            .then((data) => {
                const estacionamientos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(estacionamientos).map((key) => {
                    const estacionamiento = estacionamientos[key];
                    console.log(estacionamiento.idEstacionamiento, estacionamiento.nombre, estacionamiento.duenio.nombre, estacionamiento.direccion, estacionamiento.disponibilidadMax, estacionamiento.puestosDisponibles, estacionamiento.tiposEstadia, estacionamiento.status);
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

    //este nos servirá para traer un estacionamiento en particular, por el idEstacionamiento por ejemplo
    obtenerEstacionamientosPorCampo = (filtro) => {
        const firebase = new Firebase();
        let resultado = false;

        firebase.obtenerValorEnDB(`estacionamientos/${filtro}`)
            .then((data) => {
                const estacionamientos = data.val();

                // validamos que existan datos
                if (estacionamientos) {
                    // Recorremos cada puesto y mostramos sus datos en la consola
                    Object.keys(estacionamientos).map((key) => {
                        const estacionamiento = estacionamientos[key];
                        //aca puede haber un redireccionamiento con los datos
                        console.log(estacionamiento.idEstacionamiento, estacionamiento.nombre, estacionamiento.duenio.nombre, estacionamiento.direccion, estacionamiento.disponibilidadMax, estacionamiento.puestosDisponibles, estacionamiento.tiposEstadia, estacionamiento.status);
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

    //Me trae todos los estacionamientos cercanos a la direccion pasada por parametro en un radio de 5km
    //hay que ver si funciona, no lo pude probar aun
    traerCercanos = (direccion) => {
        const { google } = this.props;
        const geocoder = new google.maps.Geocoder();
        const distanceMatrix = new google.maps.DistanceMatrixService();
        const radio = 5 * 1000; // 5km en metros
        const resultados = [];

        // Obtiene la latitud y longitud de la direccion
        geocoder.geocode({ address: direccion }, (results, status) => {
            if (status === 'OK') {
                const { lat, lng } = results[0].geometry.location;

                // Obtiene todos los estacionamientos de la base de datos
                const firebase = new Firebase();
                firebase.obtenerDatosDeDB('estacionamientos', (estacionamientos) => {
                    estacionamientos.forEach((estacionamiento) => {
                        const { direccion: dirEstacionamiento } = estacionamiento;
                        const dir = `${dirEstacionamiento.calle} ${dirEstacionamiento.numero}, ${dirEstacionamiento.ciudad}, ${dirEstacionamiento.provincia}, ${dirEstacionamiento.pais}`;

                        // Calcula la distancia entre la dirección y el estacionamiento
                        distanceMatrix.getDistanceMatrix(
                            {
                                origins: [{ lat, lng }],
                                destinations: [{ address: dir }],
                                travelMode: 'DRIVING'
                            },
                            (response, status) => {
                                if (status === 'OK') {
                                    const { distance } = response.rows[0].elements[0];
                                    const distanciaEnMetros = distance.value;

                                    // Si el estacionamiento está dentro del radio de 5km, lo agrega al array de resultados
                                    if (distanciaEnMetros <= radio) {
                                        resultados.push(estacionamiento);
                                    }
                                } else {
                                    console.error('Error al calcular la distancia:', status);
                                }
                            }
                        );
                    });
                });
            } else {
                console.error('Error al geocodificar la dirección:', status);
            }
        });

        return resultados;
    }
    
    //Aunque solo se actualice el descuento, por ejemplo, de igual forma hay que pasar el dato del monto, igual al contrario
    modificarTarifa = (tipo, monto, descuento) => {
        const {hora, semana, mes} = this.state.tiposEstadia;

        switch (tipo) {
            case 'hora':
                hora.setState({ monto: monto });
                hora.setState({ descuento: descuento });
                break;

            case 'semana':
                semana.setState({ monto: monto });
                semana.setState({ descuento: descuento });
                break;
        
            default:
                mes.setState({ monto: monto });
                mes.setState({ descuento: descuento });
                break;
        }

        this.actualizar();
    }

}

export default Estacionamiento;