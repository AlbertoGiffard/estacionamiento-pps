import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Firebase from '../../../firebase/Firebase';

const NuevoPuestos = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
    const [datos, setDatos] = useState({
        idEstacionamiento: "",
        nombreEstacionamiento: "",
        tipoVehiculos: [],
        nuevosPuestos: 0
    });
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [disponibilidad, setDisponibilidad] = useState('Calculando...');

    useEffect(() => {
        const firebase = new Firebase();
        firebase.buscarDocumentoPorCampo('estacionamientos', 'idUsuario', userLocalStorage.idUsuario)
            .then((dataEstacionamientos) => {
                setEstacionamientos(dataEstacionamientos);
                //el primero para mostrar
                if (dataEstacionamientos[0] === undefined) {
                    setEstacionamientoSeleccionado(dataEstacionamientos);
                    setDatos((datos) => ({ ...datos, idEstacionamiento: dataEstacionamientos.idEstacionamiento, nombreEstacionamiento: dataEstacionamientos.nombreEstacionamiento, }));
                } else {
                    setEstacionamientoSeleccionado(dataEstacionamientos[0]);
                    setDatos((datos) => ({ ...datos, idEstacionamiento: dataEstacionamientos[0].idEstacionamiento, nombreEstacionamiento: dataEstacionamientos[0].nombreEstacionamiento, }));
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    useEffect(() => {
        if (estacionamientoSeleccionado) {
            obtenerDisponibilidad();
        }
    }, [estacionamientoSeleccionado])


    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        let updatedDatos = {
            ...datos,
            [name]: type === 'checkbox' ? handleCheckboxChange(name, value, checked) : value
        };
        setDatos(updatedDatos);
    };

    const handleCheckboxChange = (name, value, checked) => {
        // Manejar los cambios en los checkboxes
        let tipoVehiculos = [...datos.tipoVehiculos];

        if (checked) {
            tipoVehiculos.push(value);
        } else {
            tipoVehiculos = tipoVehiculos.filter((tipo) => tipo !== value);
        }

        return tipoVehiculos;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(datos);
    }

    const obtenerDisponibilidad = () => {
        const firebase = new Firebase();
        let count;
        let result = 'Calculando...';

        return firebase.obtenerCantidadFilas('puestosEstacionamientos', 'idEstacionamiento', estacionamientoSeleccionado.idEstacionamiento)
            .then((cantidad) => {
                count = cantidad;
                result = estacionamientoSeleccionado.disponibilidadMax - cantidad;
                setDisponibilidad(result);
            })
            .catch((error) => {
                console.error('Error al obtener los puestos', error);
            })
    }

    return (
        <div className='container-dashboard h-100'>
            <div className="text-center">
                <span className="display-3 fw-bold">
                    Nuevos Puestos
                </span>
            </div>
            <div className="container col-md-9">
                <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <div className="box d-flex flex-column justify-content-around col-md-4 mb-3">
                            <span className="fs-4">
                                Nombre Estacionamiento
                            </span>
                            <select className="form-select" onChange={handleChange} name='nombre' value={datos.nombreEstacionamiento}>
                                {estacionamientos.map((estacionamiento) => {
                                    return (
                                        <option key={estacionamiento.idEstacionamiento} value={estacionamiento.nombreEstacionamiento} className='form-control'>{estacionamiento.nombreEstacionamiento}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="box d-flex flex-column justify-content-around col-md-4 mb-3">
                            <span className="fs-4">
                                Capacidad Máxima
                            </span>
                            <span className="form-control text-center bg-secondary bg-gradient fw-bold">
                                {estacionamientoSeleccionado?.disponibilidadMax || 'Calculando...'}
                            </span>
                        </div>
                        <div className="box d-flex flex-column justify-content-around col-md-4 mb-3">
                            <span className="fs-4">
                                Disponibles
                            </span>
                            <span className="form-control text-center bg-secondary bg-gradient fw-bold">
                                {disponibilidad}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="box d-flex flex-column justify-content-around col-md-8 mb-3">
                            <span className="fs-4 mb-3">
                                Tipos de Vehiculo aceptados
                            </span>
                            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                <input type="checkbox" className="btn-check" id="bicicleta" autoComplete="off" name="tipoVehiculos"
                                    value="bicicleta"
                                    checked={datos.tipoVehiculos.includes("bicicleta")}
                                    onChange={handleChange} />
                                <label className="btn btn-outline-primary text-dark fs-4" htmlFor="bicicleta">Bicicleta</label>
                                <input type="checkbox" className="btn-check" id="moto" autoComplete="off" name="tipoVehiculos"
                                    value="moto"
                                    checked={datos.tipoVehiculos.includes("moto")}
                                    onChange={handleChange} />
                                <label className="btn btn-outline-primary text-dark fs-4" htmlFor="moto">Moto</label>
                                <input type="checkbox" className="btn-check" id="auto" autoComplete="off" name="tipoVehiculos"
                                    value="auto"
                                    checked={datos.tipoVehiculos.includes("auto")}
                                    onChange={handleChange} />
                                <label className="btn btn-outline-primary text-dark fs-4" htmlFor="auto">Auto</label>
                                <input type="checkbox" className="btn-check" id="camioneta" autoComplete="off" name="tipoVehiculos"
                                    value="camioneta"
                                    checked={datos.tipoVehiculos.includes("camioneta")}
                                    onChange={handleChange} />
                                <label className="btn btn-outline-primary text-dark fs-4" htmlFor="camioneta">Camioneta</label>
                            </div>
                        </div>
                        <div className="box d-flex flex-column justify-content-around col-md-4 mb-3">
                            <span className="fs-4 mb-3">
                                ¿Cuántos quieres crear?
                            </span>
                            <input type="number" onChange={handleChange} value={datos.nuevosPuestos} name='nuevosPuestos' min={1} max={disponibilidad} className='text-center' />
                        </div>
                        <div className="col-md-12 mt-3 row">
                            <div className="d-flex justify-content-around align-items-center">
                                <button className="btn btn-primary btn-lg btn-block btn-reserva" onClick={handleSubmit} type='button'>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NuevoPuestos