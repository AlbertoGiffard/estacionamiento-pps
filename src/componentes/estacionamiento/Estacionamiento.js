import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import Firebase from '../firebase/Firebase';
import PuestoEstacionamiento, { StatusPuesto } from '../puestoEstacionamiento/PuestoEstacionamiento';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { useState, useEffect } from "react";
import Usuario, { Roles, StatusUsuario } from '../usuario/Usuario';


export const StatusEstacionamiento = {
    PENDIENTE: 'PENDIENTE',
    RECHAZADO: 'RECHAZADO',
    INACTIVO: 'INACTIVO',
    ACTIVO: 'ACTIVO'
};

class Estacionamiento extends Component {
    constructor(datos) {
        super(datos);

        this.state = {
            idUsuario: datos.idUsuario || uuid(),
            nombre: datos.nombre,
            apellido: datos.apellido,
            dni: datos.dni,
            email: datos.email,
            contrasenia: datos.contrasenia,
            datosTarjeta: null,
            telefono: datos.telefono,
            direccion: datos.direccion,
            rol: datos.rol,
            foto: null,
            idEstacionamiento: uuid(),
            status: StatusEstacionamiento.ACTIVO,
            descuentoDia: datos.descuentoDia,
            descuentoHora: datos.descuentoHora,
            descuentoMes: datos.descuentoMes,
            direccionEstacionamiento: datos.direccionEstacionamiento,
            disponibilidadMax: datos.disponibilidadMax,
            montoDia: datos.montoDia,
            montoHora: datos.montoHora,
            montoMes: datos.montoMes,
            nombreEstacionamiento: datos.nombreEstacionamiento,
            tipoDia: datos.tipoDia,
            tipoHora: datos.tipoHora,
            tipoMes: datos.tipoMes,
            puestosDisponibles: []
        };
    }

    //Suma (y crea) la cantidad de puestos disponibles que se le indique
    static agregarPuestos = (idEstacionamiento, cantidad) => {
        const nuevosPuestos = [];
        const firebase = new Firebase();
        const promesas = [];

        for (let i = 0; i < cantidad; i++) {
            const nuevoPuesto = {
                idEstacionamiento: idEstacionamiento,
                vehiculo: null,
                tipoVehiculos: ["bicicleta", "moto", "auto", "camioneta"]
            };
            const puestoComponent = new PuestoEstacionamiento(nuevoPuesto);
            const promesa = puestoComponent.registrar()
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error(errorMessage);
                });
            promesas.push(promesa);
        }

        return Promise.all(promesas)
            .then(() => {
                return true;
            });
    }

    static restarPuestos = (idEstacionamiento, cantidad) => {
        const firebase = new Firebase();
        const promesas = [];

        return firebase.obtenerPuestosEstacionamientoPorEstacionamiento(idEstacionamiento)
            .then((puestos) => {
                const puestosParaBorrar = [];

                puestos.forEach((puesto) => {
                    if (puesto.status === StatusPuesto.LIBRE) {
                        puestosParaBorrar.push(puesto);
                    }
                })

                if (puestosParaBorrar.length >= cantidad) {
                    const promesas = [];
                    //borrar esos puestos
                    for (let i = 0; i < cantidad; i++) {
                        const puesto = puestosParaBorrar[i];
                        const promesa = firebase.borrarDocumento('puestosEstacionamientos', puesto.idPuesto)
                            .catch((error) => {
                                // Ocurrió un error al eliminar el documento
                                console.error('Error al eliminar un puesto', error);
                                return Promise.reject(new Error('Error al eliminar un puesto'));
                            });
                        promesas.push(promesa);
                    }
                    return Promise.all(promesas)
                        .then(() => {
                            return true;
                        });
                } else {
                    return Promise.reject(new Error('no hay suficientes puestos para borrar'));
                }
            })
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

        this.actualizar();
    }

    registrar = () => {
        const {
            idUsuario,
            nombre,
            apellido,
            dni,
            email,
            contrasenia,
            datosTarjeta,
            telefono,
            direccion,
            rol,
            foto,
            idEstacionamiento,
            status,
            descuentoDia,
            descuentoHora,
            descuentoMes,
            direccionEstacionamiento,
            disponibilidadMax,
            montoDia,
            montoHora,
            montoMes,
            nombreEstacionamiento,
            tipoDia,
            tipoHora,
            tipoMes

        } = this.state

        //debe registrar al usuario
        const nuevoUsuario = {
            idUsuario,
            nombre,
            apellido,
            dni,
            email,
            contrasenia,
            datosTarjeta: null,
            telefono,
            direccion,
            rol: Roles.DUENIO,
            foto: null,
            idEstacionamiento,
            status: StatusUsuario.ACTIVO
        }
        console.log(nuevoUsuario);
        const usuarioNuevo = new Usuario(nuevoUsuario);

        return usuarioNuevo.registrarse().then(() => {
            //luego al estacionamiento
            const nuevoEstacionamiento = {
                idUsuario,
                idEstacionamiento,
                status,
                descuentoHora,
                descuentoDia,
                descuentoMes,
                montoHora,
                montoDia,
                montoMes,
                tipoHora,
                tipoDia,
                tipoMes,
                nombreEstacionamiento,
                direccionEstacionamiento,
                disponibilidadMax
            }
            const firebase = new Firebase();

            return firebase.crearEnDBSinUid('estacionamientos', nuevoEstacionamiento)
                .then(() => {
                    console.log("ok estacionamiento");
                    //luego los puestos de estacionamiento
                    const cantidad = parseInt(disponibilidadMax);
                    const promesas = [];

                    for (let i = 0; i < cantidad; i++) {
                        const nuevoPuesto = {
                            idEstacionamiento,
                            vehiculo: null,
                            tipoVehiculos: ["bicicleta", "moto", "auto", "camioneta"]
                        };
                        const puestoComponent = new PuestoEstacionamiento(nuevoPuesto);
                        const promesa = puestoComponent.registrar()
                            .catch((error) => {
                                const errorMessage = error.message;
                                console.error(errorMessage);
                            });
                        promesas.push(promesa);
                    }

                    return Promise.all(promesas)
                        .then(() => {
                            return true;
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorMessage);
                });



        }).catch((error) => {
            const errorMessage = error.message;
            console.error(errorMessage);
        })
    };

    actualizar = () => {
        const firebase = new Firebase();
        const { idEstacionamiento } = this.state;

        firebase.actualizarEnDB(idEstacionamiento, 'estacionamientos', this.state)
            .then(() => {
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
            });
    }

    static nuevaCapacidad = (valorOriginal, valorNuevo, idEstacionamiento) => {
        const nuevoValorCapacidad = valorOriginal - valorNuevo;

        if (valorNuevo < 0) {
            alert('El nuevo valor de capacidad es negativo');
            return Promise.reject(new Error('El nuevo valor de capacidad es negativo'));
        } else {

            //aumento
            if (nuevoValorCapacidad < 0) {
                const cantidad = nuevoValorCapacidad * (-1);
                return this.agregarPuestos(idEstacionamiento, cantidad)
                    .then(() => {
                        return true;
                    })
                    .catch((error) => {
                        console.log('aumento', error);
                        throw error;
                    })
            } else if (nuevoValorCapacidad > 0) {
                //disminuyo
                return this.restarPuestos(idEstacionamiento, nuevoValorCapacidad);
            } else {
                //igual
                return Promise.resolve(true);
            }
        }
    }

    static puedeEstarInactivo = (idEstacionamiento) => {
        const firebase = new Firebase();

        return firebase.obtenerPuestosEstacionamientoPorEstacionamiento(idEstacionamiento)
            .then((puestos) => {
                for (let i = 0; i < puestos.length; i++) {
                    const puesto = puestos[i];
                    if (puesto.status === StatusPuesto.OCUPADO) {
                        throw new Error('Hay puestos aún ocupados');
                    }
                }
                return Promise.resolve(true); // Resolver la promesa si no hay puestos ocupados
            });
    }

    static actualizar = (estacionamiento) => {
        const firebase = new Firebase();
        const { idEstacionamiento } = estacionamiento;

        return firebase.buscarDocumentoPorCampo('estacionamientos', 'idEstacionamiento', idEstacionamiento)
            .then((documentos) => {
                if (documentos.length > 0) {
                    // Actualizar el primer documento encontrado con los nuevos datos
                    const primerDocumento = documentos[0];
                    return Estacionamiento.nuevaCapacidad(parseInt(primerDocumento.disponibilidadMax), parseInt(estacionamiento.disponibilidadMax), idEstacionamiento)
                        .then((result) => {
                            console.log('result', result); // Manejar el resultado aquí
                            return Estacionamiento.puedeEstarInactivo(idEstacionamiento)
                                .then(() => {
                                    return firebase.actualizarEnDB(primerDocumento.id, 'estacionamientos', estacionamiento);                                
                                })
                        })
                } else {
                    return Promise.reject(new Error(`No se encontró ningún documento con el campo idEstacionamiento: ${idEstacionamiento}`));
                }
            })
            .catch((error) => {
                throw error;
            })
    }


    obtenerEstacionamientos = () => {
        const firebase = new Firebase();

        firebase.obtenerTodosEnDB('estacionamientos')
            .then((data) => {
                const estacionamientos = data.val();

                // Recorremos cada vehiculo y mostramos sus datos en la consola
                Object.keys(estacionamientos).map((key) => {
                    const estacionamiento = estacionamientos[key];
                    console.log(estacionamiento.idEstacionamiento, estacionamiento.nombre, estacionamiento.duenio.nombre, estacionamiento.direccion, estacionamiento.disponibilidadMax, estacionamiento.puestosDisponibles, estacionamiento.tiposEstadia, estacionamiento.status);
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

    //este nos servirá para traer un estacionamiento en particular, por el idEstacionamiento por ejemplo
    obtenerEstacionamientosPorCampo = (filtro) => {
        const firebase = new Firebase();

        return firebase.obtenerValorEnDB(`estacionamientos/${filtro}`)
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
                    return true;
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage);
                return true;
            });
    }

    //Me trae todos los estacionamientos cercanos a la direccion pasada por parametro en un radio de 5km
    //hay que ver si funciona, no lo pude probar aun
    /* traerCercanos = (direccion, callback) => {
        const { google } = props;
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
                    // Obtenemos las distancias de cada estacionamiento
                    const promises = estacionamientos.map((estacionamiento) => {
                        const { direccion: dirEstacionamiento } = estacionamiento;
                        const dir = `${dirEstacionamiento.calle} ${dirEstacionamiento.numero}, ${dirEstacionamiento.ciudad}, ${dirEstacionamiento.provincia}, ${dirEstacionamiento.pais}`;

                        return new Promise((resolve, reject) => {
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
                                        resolve();
                                    } else {
                                        console.error('Error al calcular la distancia:', status);
                                        reject(status);
                                    }
                                }
                            );
                        });
                    });

                    Promise.all(promises)
                        .then(() => {
                            callback(resultados);
                        })
                        .catch((error) => {
                            console.error('Error al obtener las distancias:', error);
                            callback([]);
                        });
                });
            } else {
                console.error('Error al geocodificar la dirección:', status);
                callback([]);
            }
        });
    }; */


    //Aunque solo se actualice el descuento, por ejemplo, de igual forma hay que pasar el dato del monto, igual al contrario
    modificarTarifa = (tipo, monto, descuento) => {
        const { hora, semana, mes } = this.state.tiposEstadia;

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
