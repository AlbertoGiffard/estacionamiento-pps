import { useLocation } from 'react-router-dom';
import MenuLateral from '../../../utilitarios/menuLateral/MenuLateral';
import './NuevaReserva.css';
import { v4 as uuid } from 'uuid';
import React, { Fragment, useState } from 'react';
import { StatusPago, StatusReserva } from '../../../reserva/Reserva';

const NuevaReserva = () => {
    const location = useLocation();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [datos, setDatos] = useState({
        idReserva: uuid(),
        estacionamiento: "",
        usuario: userLocalStorage,
        vehiculo: "",
        tipo: "",
        fechaLlegada: "",
        fechaSalida: "",
        status: StatusReserva.POR_CONFIRMAR,
        statusPago: StatusPago.POR_PAGAR,
        descuento: "",
        total: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedDatos = {
            ...datos,
            [name]: value
        };
        setDatos(updatedDatos);
    };

    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <MenuLateral />
            </div>
            <div className="container col-md-9">
                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <span className="display-6">
                                Vehiculo
                            </span>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Modelo</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">S3</option>
                                        <option value="camion">Sport</option>
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Marca</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">audi</option>
                                        <option value="camion">bmw</option>
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Patente</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">123abc</option>
                                        <option value="camion">456ert</option>
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Tipo</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">Auto</option>
                                        <option value="camion">Camioneta</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3">
                            <span className="display-6">
                                Estacionamiento
                            </span>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Nombre Estacionamiento</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">centro E</option>
                                        <option value="camion">Laurel</option>
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Dirección</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">Gotham 123</option>
                                        <option value="camion">Central City 789</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3">
                            <span className="display-6">
                                Reserva
                            </span>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Tipo</span>
                                    <select className="form-select" onChange={handleChange}>
                                        <option value="vehiculo del usuario">Hora</option>
                                        <option value="camion">Dia</option>
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Fecha Llegada</span>
                                    <input type="date" onChange={handleChange} />
                                </div>
                                <div className="box">
                                    <span>Fecha Salida</span>
                                    <input type="date" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3">
                            <div className="d-flex flex-row mb-4">
                                <span className="display-6">
                                    Metodo de Pago
                                </span>
                                <button className='btn btn-secondary'>Tarjeta</button>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Titular</span>
                                    <input type="text" onChange={handleChange} />
                                </div>
                                <div className="box">
                                    <span>Número</span>
                                    <input type="text" onChange={handleChange} />
                                </div>
                                <div className="box">
                                    <span>Vencimiento</span>
                                    <input type="Date" onChange={handleChange} />
                                </div>
                                <div className="box">
                                    <span>Cod. Seguridad</span>
                                    <input type="text" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3 row">
                            <div className="col-md-6">
                                <span className="display-6">
                                    Sub-Total: $500
                                    <br />
                                    Descuento: $100
                                    <br />
                                    Total: $400
                                </span>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-primary">Reservar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NuevaReserva;