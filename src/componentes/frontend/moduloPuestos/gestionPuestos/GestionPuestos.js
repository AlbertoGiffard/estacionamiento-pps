import React, { useEffect, useState } from 'react'
import './GestionPuestos.css';
import Firebase from '../../../firebase/Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import PuestoEstacionamiento, { StatusPuesto } from '../../../puestoEstacionamiento/PuestoEstacionamiento';

const GestionPuestos = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
    const [datos, setDatos] = useState({
        idEstacionamiento: "",
        nombreEstacionamiento: ""
    });
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [puestos, setPuestos] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();
        firebase.buscarDocumentoPorCampo('estacionamientos', 'idUsuario', userLocalStorage.idUsuario)
            .then((dataEstacionamientos) => {
                setEstacionamientos(dataEstacionamientos);
                //el primero para mostrar
                if (dataEstacionamientos[0] === undefined) {
                    setEstacionamientoSeleccionado(dataEstacionamientos);
                    setDatos((datos) => ({ ...datos, idEstacionamiento: dataEstacionamientos.idEstacionamiento, nombreEstacionamiento: dataEstacionamientos.nombreEstacionamiento, }));
                    buscarPuestos(dataEstacionamientos.idEstacionamiento);
                } else {
                    setEstacionamientoSeleccionado(dataEstacionamientos[0]);
                    setDatos((datos) => ({ ...datos, idEstacionamiento: dataEstacionamientos[0].idEstacionamiento, nombreEstacionamiento: dataEstacionamientos[0].nombreEstacionamiento, }));
                    buscarPuestos(dataEstacionamientos[0].idEstacionamiento);
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const buscarPuestos = (idEstacionamiento) => {
        const firebase = new Firebase();

        return firebase.buscarDocumentoPorCampo('puestosEstacionamientos', 'idEstacionamiento', idEstacionamiento)
            .then((dataPuestos) => {
                setPuestos(dataPuestos);
                /* if (dataPuestos[0] === undefined) {
                } else {
                    setPuestos(dataPuestos[0]);
                } */
                console.log(dataPuestos);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;

        // Copia de los puestos
        const puestosCopia = [...puestos];

        // Copia del puesto actual
        const puestoActualizado = { ...puestosCopia[index] };

        // Actualizar el valor de disponibilidad para la fila correspondiente
        if (name === 'bicicleta' || name === 'moto' || name === 'auto' || name === 'camioneta') {
            if (value === 'true') {
                puestoActualizado.tipoVehiculos.push(name);
            } else {
                const indexToRemove = puestoActualizado.tipoVehiculos.indexOf(name);
                if (indexToRemove !== -1) {
                    puestoActualizado.tipoVehiculos.splice(indexToRemove, 1);
                }
            }
        } else {
            puestoActualizado[name] = value;
        }

        // Actualizar la copia de puestos con el puesto actualizado
        puestosCopia[index] = puestoActualizado;

        // Actualizar el estado con los puestos actualizados
        setPuestos(puestosCopia);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        try {
            const promesas = puestos.map((puesto) => {
                return PuestoEstacionamiento.actualizar(puesto)
                    .catch((error) => {
                        const errorMessage = error.message;
                        console.error(errorMessage);
                        alert(`Error: Verifique los siguientes casos:\n- Verificar los campos\n- No se puede pasar a inactivo si está ocupado el puesto`);
                        window.location.reload();
                        throw error;
                    })
                    /* .finally(() => {
                        actualizarLista(puesto);
                    }); */
            });
            return Promise.all(promesas).then(() => {
                alert('Cambios realizados correctamente');
                console.log('exitazo');
                return true;
            })

        } catch (error) {
            alert('Error: Verifique los siguientes casos:\n- Verificar los campos\n- No se puede pasar a inactivo si está ocupado el puesto');
        }
    }

    const obtenerRow = (puestoValor, index) => {
        const puestoDatos = {
            ...puestoValor,
            bicicleta: puestoValor.tipoVehiculos.includes('bicicleta'),
            moto: puestoValor.tipoVehiculos.includes('moto'),
            auto: puestoValor.tipoVehiculos.includes('auto'),
            camioneta: puestoValor.tipoVehiculos.includes('camioneta')
        }

        const esOcupado = puestoDatos.status === StatusPuesto.OCUPADO;

        return (
            <tr key={puestoDatos.idPuesto} className="align-middle text-center text-web">
                <th scope="row" className='size-field'>{index + 1}</th>
                <td className=''>
                    <select
                        className="form-select size-field-select"
                        onChange={(event) => handleChange(event, index)}
                        name='bicicleta'
                        value={puestoDatos.bicicleta ? 'true' : 'false'}>
                        <option value='true'>Habilitado</option>
                        <option value='false'>Deshabilitado</option>
                    </select>
                </td>
                <td className=''>
                    <select
                        className="form-select size-field-select"
                        onChange={(event) => handleChange(event, index)}
                        name='moto'
                        value={puestoDatos.moto ? 'true' : 'false'}>
                        <option value='true'>Habilitado</option>
                        <option value='false'>Deshabilitado</option>
                    </select>
                </td>
                <td className=''>
                    <select
                        className="form-select size-field-select"
                        onChange={(event) => handleChange(event, index)}
                        name='auto'
                        value={puestoDatos.auto ? 'true' : 'false'}>
                        <option value='true'>Habilitado</option>
                        <option value='false'>Deshabilitado</option>
                    </select>
                </td>
                <td className=''>
                    <select
                        className="form-select size-field-select"
                        onChange={(event) => handleChange(event, index)}
                        name='camioneta'
                        value={puestoDatos.camioneta ? 'true' : 'false'}>
                        <option value='true'>Habilitado</option>
                        <option value='false'>Deshabilitado</option>
                    </select>
                </td>
                {/* vehiculo */}
                <td className=''>
                    {puestoDatos.vehiculo ?
                        `${puestoDatos.vehiculo.modelo} ${puestoDatos.vehiculo.patente}`
                        :
                        'S/ vehiculo'}
                </td>
                <td className=''>
                    <select
                        className="form-select size-field-select"
                        onChange={(event) => handleChange(event, index)}
                        name='status'
                        disabled={esOcupado}
                        value={puestoDatos.status}>
                        <option value="ACTIVO">Activo</option>
                        <option value="INACTIVO">Inactivo</option>
                        <option value="OCUPADO" disabled>Ocupado</option>
                    </select>
                </td>
            </tr>
        )
    }

    return (
        <div className='container-dashboard h-100'>
            <div className="d-flex flex-direction-row justify-content-center align-items-center m-3">
                <div className="text-center mr-2">
                    <span className="display-6 fw-bold mr-20">
                        Seleccione un estacionamiento:
                    </span>
                </div>
                <div>
                    <select className="form-select" onChange={handleChange} name='estacionamiento' value={datos.nombreEstacionamiento}>
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
                            <th scope="col">Bicicleta</th>
                            <th scope="col">Moto</th>
                            <th scope="col">Auto</th>
                            <th scope="col">Camioneta</th>
                            <th scope="col">Vehiculo</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            puestos.length ?
                                puestos.map((puesto, index) => {
                                    return obtenerRow(puesto, index);
                                })
                                :
                                <tr>
                                    <td colSpan="7" className="text-center display-6">
                                        No tiene puestos registrados
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

export default GestionPuestos