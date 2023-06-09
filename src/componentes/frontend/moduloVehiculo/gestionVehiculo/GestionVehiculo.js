import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Firebase from '../../../firebase/Firebase';
import Vehiculo, { StatusVehiculo } from '../../../vehiculo/Vehiculo';

const GestionVehiculo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();

        firebase.obtenerValorPorUnCampoEspecifico('vehiculos', 'usuario.email', userLocalStorage.email)
            .then((vehiculosDb) => {
                if (vehiculosDb !== null) {
                    console.log(vehiculosDb);
                    if (vehiculosDb[0] !== undefined) {
                        setVehiculos(vehiculosDb);
                    } else {
                        setVehiculos((datos) => {
                            if (Array.isArray(datos)) {
                                return [...datos, vehiculosDb];
                            } else {
                                return [vehiculosDb];
                            }
                        });
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        console.log('vehiculos actualizados:', vehiculos);
    }, [vehiculos]);

    const actualizarLista = (vehiculoActualizado) => {
        const nuevosvehiculos = vehiculos.map((vehiculo) => {
            if (vehiculo.idVehiculo === vehiculoActualizado.idVehiculo) {
                return vehiculoActualizado;
            }
            return vehiculo;
        });

        setVehiculos(nuevosvehiculos);

    };

    const handleActivo = (status) => {
        let result = true;

        if (status === 'INACTIVO') {
            result = false;
        }

        return result;
    }

    const active = (vehiculo) => {
        let count = 0;
        let copyVehiculo = vehiculo;

        vehiculos.forEach((vehiculo) => {
            if (vehiculo.status === 'ACTIVO' || vehiculo.status === 'EN_PUESTO') {
                count++;
            }
        })

        if (count < 3) {
            copyVehiculo.status = StatusVehiculo.ACTIVO;
            const vehiculoComponent = new Vehiculo(copyVehiculo);

            vehiculoComponent.actualizar()
                .then(() => {
                    actualizarLista(vehiculo);
                })
                .catch((error) => {
                    console.error("vehiculo", error);
                })
        } else {
            alert('Máximo puedes tener 3 vehiculos activos, desactiva alguno primero');
        }
    }

    const inactive = (vehiculo) => {
        let copyVehiculo = vehiculo;
        copyVehiculo.status = StatusVehiculo.INACTIVO;
        const vehiculoComponent = new Vehiculo(copyVehiculo);

        vehiculoComponent.actualizar()
            .then(() => {
                actualizarLista(vehiculo);
            })
            .catch((error) => {
                console.error("vehiculo", error);
            })
    }

    return (
        <div className='container-dashboard row h-100'>
            <div className="table-responsive my-3">
                <table className="table table-hover table-blur">
                    <thead>
                        <tr>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Patente</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Color</th>
                            <th scope="col">Total Reservas</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehiculos.length ?
                                vehiculos.map((vehiculo) => {
                                    return (
                                        <tr key={vehiculo.idVehiculo}>
                                            <th scope="row">{vehiculo.marca}</th>
                                            <td>{vehiculo.modelo}</td>
                                            <td>{vehiculo.patente}</td>
                                            <td>{vehiculo.tipo}</td>
                                            <td>{vehiculo.color}</td>
                                            <td>{vehiculo.totalReservas}</td>
                                            <td>{vehiculo.status.toLowerCase()}</td>
                                            <td>
                                                <div className="flex justify-content-around flex-wrap">
                                                    {
                                                        handleActivo(vehiculo.status) ? (
                                                            <button className="btn btn-danger" title='Inactivar' onClick={() => inactive(vehiculo)}>
                                                                Inactivar
                                                            </button>
                                                        )
                                                            :
                                                            <button className="btn btn-success" title='Activar' onClick={() => active(vehiculo)}>
                                                                Activar
                                                            </button>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="8" className="text-center display-6">
                                        No tiene vehiculos registrados
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GestionVehiculo