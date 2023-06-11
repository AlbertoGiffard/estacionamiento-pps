import React, { useEffect, useState } from 'react'
import GoogleMap from '../../googleMap/GoogleMap'
import { useLocation, useNavigate } from 'react-router-dom'
import ListaEstacionamiento from '../../estacionamiento/list/ListaEstacionamiento'
import Firebase from '../../firebase/Firebase'
import { StatusPuesto } from '../../puestoEstacionamiento/PuestoEstacionamiento'
import Geocode from 'react-geocode';

// Configurar la clave de API
Geocode.setApiKey('AIzaSyC-nBlHCf6Ul8vQf5vWJJMglKkKew7S82Y');
Geocode.setRegion('ar');

const Mapa = () => {
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [direcciones, setDirecciones] = useState([]);
    const [puntos, setPuntos] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();

        firebase.obtenerValorEnDB('estacionamientos')
            .then((estacionamientosDb) => {
                if (estacionamientosDb !== null) {
                    if (estacionamientosDb[0] !== undefined) {
                        setEstacionamientos(estacionamientosDb);
                    } else {
                        setEstacionamientos((datos) => {
                            if (Array.isArray(datos)) {
                                return [...datos, estacionamientosDb];
                            } else {
                                return [estacionamientosDb];
                            }
                        });
                    }
                    const obtenerDisponibilidadesPromises = estacionamientosDb.map((estacionamiento) => {
                        setDirecciones((datos) => [...datos, estacionamiento.direccionEstacionamiento]);
                        obtenerDisponibilidad(estacionamiento);
                    });

                    Promise.all(obtenerDisponibilidadesPromises)
                        .then(() => {
                            setEstacionamientos([...estacionamientosDb]);
                        })
                        .catch((error) => {
                            console.error('Error al obtener las disponibilidades', error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        console.log('direcciones', direcciones);
        if (direcciones.length) {
            geocodeDirecciones(direcciones);
        }
        console.log('puntos', puntos);
    }, [direcciones])

    useEffect(() => {
        console.log('puntos', puntos);
    }, [puntos])

    const geocodeDirecciones = (direcciones) => {
        const geocodePromises = direcciones.map((direccion) => {
            return Geocode.fromAddress("Buenos Aires").then((response) => {
                console.log(response.results);
                const { lat, lng } = response.results[0].geometry.location;
                return { direccion, lat, lng };
            }).catch((error) => {
                console.error('Error al geocodificar la dirección', direccion, error);
                return null;
            });
        });

        Promise.all(geocodePromises).then((coordenadas) => {
            const puntos = coordenadas.filter((coordenada) => coordenada !== null);
            setPuntos(puntos);
        });
    };



    const obtenerTipos = (estacionamiento) => {
        const tipoTexto = [];

        if (estacionamiento.tipoDia === 'on') {
            tipoTexto.push('Dia');
        }

        if (estacionamiento.tipoHora === 'on') {
            tipoTexto.push('Hora');
        }

        if (estacionamiento.tipoMes === 'on') {
            tipoTexto.push('Mes');
        }

        return tipoTexto.join('-');
    }

    const obtenerDisponibilidad = (estacionamiento) => {
        const firebase = new Firebase();

        try {
            return firebase.obtenerValorPorUnCampoEspecifico('puestosEstacionamientos', 'idEstacionamiento', estacionamiento.idEstacionamiento)
                .then((puestos) => {
                    let count = 0;
                    puestos.map((puesto) => {
                        if (puesto.status === StatusPuesto.LIBRE) {
                            count++;
                        }
                    })
                    estacionamiento.disponibilidad = count;
                })
        } catch (error) {
            console.error('Error al obtener los puestos', error);
            return 'Error';
        }
    }

    const estacionamientoSeleccionado = (estacionamiento) => {
        console.log(estacionamiento);
    }

    return (
        <div className="container d-flex container-mapa justify-content-around text-center my-3">
            <div className="mapa py-3 pt-0 margin-right-md">
                <GoogleMap puntos={puntos}/>
            </div>
            <div>
                <div className=''>
                    <div className="list-group scrolleable-list blur-bg">
                        <div className="list-group-item list-group-item-action bg-transparent" aria-current="true">
                            <ListaEstacionamiento estacionamientos={estacionamientos} obtenerTipos={obtenerTipos} estacionamientoSeleccionado={estacionamientoSeleccionado} />
                        </div>
                    </div>
                    {/* <div className="text-center d-grid gap-2 mx-auto p-3">
                        <button type="button" className="btn btn-ok btn-lg">
                            <Link to="/login" className="nav-link active">
                                Reservar
                            </Link>
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Mapa