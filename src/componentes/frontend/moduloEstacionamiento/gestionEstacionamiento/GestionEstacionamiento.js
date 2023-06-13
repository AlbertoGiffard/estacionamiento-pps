import React, { useEffect, useState } from 'react'
import './GestionEstacionamiento.css';
import Firebase from '../../../firebase/Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import Estacionamiento from '../../../estacionamiento/Estacionamiento';

const GestionEstacionamiento = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [estacionamientos, setEstacionamientos] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();

        firebase.obtenerValorPorUnCampoEspecifico('estacionamientos', 'idUsuario', userLocalStorage.idUsuario)
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
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const actualizarLista = (estacionamientoActualizado) => {
        const nuevosEstacionamientos = estacionamientos.map((estacionamiento) => {
            if (estacionamiento.idEstacionamiento === estacionamientoActualizado.idEstacionamiento) {
                return estacionamientoActualizado;
            }
            return estacionamiento;
        });

        setEstacionamientos(nuevosEstacionamientos);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
        
        console.log(estacionamientos[0]);

        try {
            const promesas = estacionamientos.map((estacionamiento) => {
                return Estacionamiento.actualizar(estacionamiento)
                    .catch((error) => {
                        const errorMessage = error.message;
                        console.error(errorMessage);
                        alert(`Error: Verifique los siguientes casos:\n- Verificar los campos\n- La cantidad de puestos a remover es mayor a la cantidad de puestos libres\n- No se puede pasar a inactivo si hay aún puestos ocupados`);
                        window.location.reload();
                        throw error;
                    })
                    .finally(() => {
                        actualizarLista(estacionamiento);
                    });
            });
            return Promise.all(promesas).then(() => {
                alert('Cambios realizados correctamente');
                console.log('exitazo');
                return true;
            })

        } catch (error) {
            alert('Error: Verifique los campos, si disminuyó la capacidad puede que no hayan puestos diponibles para remover y recargue la página nuevamente');
        }
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;

        // Crear una copia del array de estacionamientos
        const estacionamientosActualizados = [...estacionamientos];

        // Actualizar el valor de disponibilidad para la fila correspondiente
        estacionamientosActualizados[index] = {
            ...estacionamientosActualizados[index],
            [name]: value
        };

        // Actualizar el estado con los estacionamientos actualizados
        setEstacionamientos(estacionamientosActualizados);
    };

    return (
        <div className='container-dashboard row h-100'>
            <div className="table-responsive my-3">
                <table className="table table-hover table-blur">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">Nombre</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Disponibilidad Máx.</th>
                            <th scope="col">Tipo Hora</th>
                            <th scope="col">Tipo Día</th>
                            <th scope="col">Tipo Mes</th>
                            <th scope="col">Monto Hora</th>
                            <th scope="col">Monto Día</th>
                            <th scope="col">Monto Mes</th>
                            <th scope="col">Desc. Hora</th>
                            <th scope="col">Desc. Día</th>
                            <th scope="col">Desc. Mes</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            estacionamientos.length ?
                                estacionamientos.map((estacionamiento, index) => {
                                    return (
                                        <tr key={estacionamiento.idEstacionamiento} className="align-middle">
                                            <th scope="row" className='size-field'>{estacionamiento.nombreEstacionamiento}</th>
                                            <td className=' size-field'>{estacionamiento.direccionEstacionamiento}</td>
                                            <td className="text-wrap size-field">
                                                <input
                                                    type="text"
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.disponibilidadMax}
                                                    name='disponibilidadMax'
                                                    className='size-field'
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className="form-select size-field-select"
                                                    onChange={(event) => handleChange(event, index)}
                                                    name='tipoHora'
                                                    value={estacionamiento.tipoHora || "off"}>
                                                    <option value="on">Activo</option>
                                                    <option value="off">Desactivo</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    className="form-select size-field-select"
                                                    onChange={(event) => handleChange(event, index)}
                                                    name='tipoDia'
                                                    value={estacionamiento.tipoDia || "off"}>
                                                    <option value="on">Activo</option>
                                                    <option value="off">Desactivo</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select
                                                    className="form-select size-field-select"
                                                    onChange={(event) => handleChange(event, index)}
                                                    name='tipoMes'
                                                    value={estacionamiento.tipoMes || "off"}>
                                                    <option value="on">Activo</option>
                                                    <option value="off">Desactivo</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className='size-field'
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.montoHora}
                                                    name='montoHora'
                                                    
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className='size-field'
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.montoDia}
                                                    name='montoDia'
                                                    
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className='size-field'
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.montoMes}
                                                    name='montoMes'
                                                    
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className='size-field'
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.descuentoHora}
                                                    name='descuentoHora'
                                                    
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className='size-field'
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.descuentoDia}
                                                    name='descuentoDia'
                                                    
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className='size-field'
                                                    onChange={(event) => handleChange(event, index)}
                                                    value={estacionamiento.descuentoDia}
                                                    name='descuentoDia'
                                                    
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className="form-select size-field-select"
                                                    onChange={(event) => handleChange(event, index)}
                                                    name='status'
                                                    value={estacionamiento.status || "INACTIVO"}>
                                                    <option value="ACTIVO">Activo</option>
                                                    <option value="INACTIVO">Inactivo</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="13" className="text-center display-6">
                                        No tiene estacionamientos registrados
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
                <div className="flex justify-content-around flex-wrap text-center">
                    <button className="btn btn-lg btn-block btn-success" title='Actualizar' onClick={handleUpdate}>
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GestionEstacionamiento