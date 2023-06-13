import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Usuario, { StatusUsuario } from '../../../usuario/Usuario';
import Firebase from '../../../firebase/Firebase';

const GestionTrabajadores = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        dni: 0,
        email: "",
        telefono: 0,
        status: StatusUsuario.ACTIVO,
        idEstacionamiento: "",
        nombreEstacionamiento: ""
    });
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();
        firebase.buscarDocumentoPorCampo('estacionamientos', 'idUsuario', userLocalStorage.idUsuario)
            .then((dataEstacionamientos) => {
                if (dataEstacionamientos === null) {
                    alert('Debe crear primero un estacionamiento');
                    navigate('/dashboard');
                    return;
                }
                setEstacionamientos(dataEstacionamientos);
                //el primero para mostrar
                if (dataEstacionamientos[0] === undefined) {
                    setEstacionamientoSeleccionado(dataEstacionamientos);
                    setDatos((datos) => ({ ...datos, idEstacionamiento: dataEstacionamientos.idEstacionamiento, nombreEstacionamiento: dataEstacionamientos.nombreEstacionamiento, }));
                    buscarTrabajadores(dataEstacionamientos.idEstacionamiento);
                } else {
                    setEstacionamientoSeleccionado(dataEstacionamientos[0]);
                    setDatos((datos) => ({ ...datos, idEstacionamiento: dataEstacionamientos[0].idEstacionamiento, nombreEstacionamiento: dataEstacionamientos[0].nombreEstacionamiento, }));
                    buscarTrabajadores(dataEstacionamientos[0].idEstacionamiento);
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const buscarTrabajadores = (idEstacionamiento) => {
        const firebase = new Firebase();

        return firebase.buscarDocumentoPorCampo('usuarios', 'idEstacionamiento', idEstacionamiento)
            .then((dataTrabajadores) => {
                let arrayTrabajadores = dataTrabajadores.filter((trabajador) => trabajador.email !== userLocalStorage.email);
                setTrabajadores(arrayTrabajadores);
                console.log(arrayTrabajadores);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const actualizarLista = (trabajadorActualizado) => {
        const nuevostrabajadores = trabajadores.map((trabajador) => {
            if (trabajador.idUsuario === trabajadorActualizado.idUsuario) {
                return trabajadorActualizado;
            }
            return trabajador;
        });

        setTrabajadores(nuevostrabajadores);
    };

    const handleActivo = (status) => {
        let result = true;

        if (status === 'INACTIVO') {
            result = false;
        }

        return result;
    }

    const active = (trabajador) => {
        let copyTrabajador = trabajador;
        copyTrabajador.status = StatusUsuario.ACTIVO;

        Usuario.actualizar(copyTrabajador)
            .then(() => {
                actualizarLista(copyTrabajador);
            })
            .catch((error) => {
                console.error("trabajador", error);
            })
    }

    const inactive = (trabajador) => {
        let copyTrabajador = trabajador;
        copyTrabajador.status = StatusUsuario.INACTIVO;

        Usuario.actualizar(copyTrabajador)
            .then(() => {
                actualizarLista(copyTrabajador);
            })
            .catch((error) => {
                console.error("trabajador", error);
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        try {
            const promesas = trabajadores.map((trabajador) => {
                return Usuario.actualizar(trabajador)
                    .catch((error) => {
                        const errorMessage = error.message;
                        console.error(errorMessage);
                        alert(`Error: No se puede modificar en este momento intente nuevamente`);
                        window.location.reload();
                        throw error;
                    })
            });
            return Promise.all(promesas).then(() => {
                alert('Cambios realizados correctamente');
                console.log('exitazo');
                return true;
            })

        } catch (error) {
            alert('Error: No se puede modificar en este momento intente nuevamente');
        }
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;

        // Copia de los trabajadores
        const trabajadoresCopia = [...trabajadores];

        // Copia del trabajador actual
        const trabajadorActualizado = { ...trabajadoresCopia[index] };

        trabajadorActualizado[name] = value;

        // Actualizar la copia de trabajadores con el trabajador actualizado
        trabajadoresCopia[index] = trabajadorActualizado;

        // Actualizar el estado con los trabajadores actualizados
        setTrabajadores(trabajadoresCopia);
    };

    const handleChangeEstacionamiento = (event) => {
        const estacionamientoSeleccionado = estacionamientos.find(
            (estacionamiento) => estacionamiento.nombreEstacionamiento === event.target.value
        );

        setEstacionamientoSeleccionado(estacionamientoSeleccionado);
        setDatos((datos) => ({
            ...datos,
            idEstacionamiento: estacionamientoSeleccionado.idEstacionamiento,
            nombreEstacionamiento: estacionamientoSeleccionado.nombreEstacionamiento,
        }));
        buscarTrabajadores(estacionamientoSeleccionado.idEstacionamiento);
    };


    return (
        <div className='container-dashboard h-100'>
            <div className="d-flex flex-direction-row justify-content-center align-items-center m-3">
                <div className="text-center mr-2">
                    <span className="display-6 fw-bold mr-20">
                        Seleccione un estacionamiento:
                    </span>
                </div>
                <div>
                    <select className="form-select" onChange={handleChangeEstacionamiento} name='estacionamiento' value={datos.nombreEstacionamiento}>
                        {estacionamientos.map((estacionamiento) => {
                            return (
                                <option key={estacionamiento.idEstacionamiento} value={estacionamiento.nombreEstacionamiento} className='form-control'>{estacionamiento.nombreEstacionamiento}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="table-responsive my-3">
                <table className="table table-hover table-blur">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            trabajadores.length ?
                                trabajadores.map((trabajador, index) => {
                                    return (
                                        <tr key={trabajador.idUsuario} className='text-center'>
                                            <th scope="row">{index + 1}</th>
                                            <td>{trabajador.nombre}</td>
                                            <td>{trabajador.apellido}</td>
                                            <td>{trabajador.dni}</td>
                                            <td>{trabajador.email}</td>
                                            <td>{trabajador.telefono}</td>
                                            <td>{trabajador.status.toLowerCase()}</td>
                                            <td>
                                                <div className="flex justify-content-around flex-wrap">
                                                    {
                                                        handleActivo(trabajador.status) ? (
                                                            <button className="btn btn-danger" title='Inactivar' onClick={() => inactive(trabajador)}>
                                                                Inactivar
                                                            </button>
                                                        )
                                                            :
                                                            <button className="btn btn-success" title='Activar' onClick={() => active(trabajador)}>
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
                                    <td colSpan="7" className="text-center display-6">
                                        No tiene trabajadores registrados
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

export default GestionTrabajadores