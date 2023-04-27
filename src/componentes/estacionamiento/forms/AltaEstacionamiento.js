import './AltaEstacionamiento.css';
import React, { useState } from "react";

const AltaEstacionamiento = () => {
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        dni: 0,
        email: "",
        telefono: 0,
        contrasenia: "",
        validarContrasenia: "",
        nombreEstacionamiento: "",
        direccionEstacionamiento: "",
        disponibilidadMax: 0,
        tiposEstadia: [
            {
                tipo: 'hora',
                monto: 0,
                descuento: 0
            },
            {
                tipo: 'semana',
                monto: 0,
                descuento: 0
            },
            {
                tipo: 'mes',
                monto: 0,
                descuento: 0
            },
        ]
    });

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(datos);
    };

    return (
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="nombre" className="fs-4">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Junior" value={datos.nombre} required />
                    <div className="invalid-feedback">
                        Por favor ingrese su nombre.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="apellido" className="fs-4">Apellido</label>
                    <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Prueba" value={datos.apellido} required />
                    <div className="invalid-feedback">
                        Por favor ingrese su apellido.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="dni" className="fs-4">DNI</label>
                    <input type="number" max={98000000} min={1000000} className="form-control" id="dni" name="dni" placeholder="12345678" required />
                    <div className="invalid-feedback">
                        Por favor ingrese un DNI válido.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="fs-4">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="correo@mail.com" value={datos.email} required />
                    <div className="invalid-feedback">
                        Por favor ingrese un email válido.
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="telefono" className="fs-4">Teléfono</label>
                    <input type="number" max={1199999999} min={1100000001} className="form-control" id="telefono" name="telefono" placeholder="1188994455" required />
                    <div className="invalid-feedback">
                        Por favor ingrese un telefono válido.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="contrasenia" className="fs-4">Contraseña</label>
                    <input type="password" className="form-control" id="contrasenia" name="contrasenia" value={datos.contrasenia} required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="validarContrasenia" className="fs-4">Repetir Contraseña</label>
                    <input type="password" className="form-control" id="validarContrasenia" name="validarContrasenia" value={datos.validarContrasenia} required />
                    <div className="invalid-feedback">
                        Las contraseñas no coinciden.
                    </div>
                </div>
            </div>
            <hr />
            {/* Aca los datos del estacionamiento */}
            <div className="row">
                <label className="text-center fs-3 fw-bold">Estacionamiento</label>
                <div className="col-md-3 mb-3">
                    <label htmlFor="nombreEstacionamiento" className="fs-4">Nombre</label>
                    <input type="text" className="form-control" id="nombreEstacionamiento" name="nombreEstacionamiento" placeholder="Estacionamiento" value={datos.nombreEstacionamiento} required />
                    <div className="invalid-feedback">
                        Por favor ingrese un nombre válido.
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="direccionEstacionamiento" className="fs-4">Dirección</label>
                    <input type="text" className="form-control" id="direccionEstacionamiento" name="direccionEstacionamiento" placeholder="Gotham 123" value={datos.direccionEstacionamiento} required />
                    <div className="invalid-feedback">
                        Por favor ingrese una dirección válida.
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="disponibilidadMax" className="fs-4 text-break">Capacidad</label>
                    <input type="number" max={10000} min={0} className="form-control" id="disponibilidadMax" name="disponibilidadMax" placeholder="15" required />
                    <div className="invalid-feedback">
                        Por favor ingrese una cantidad válida.
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="tipo" className="fs-5 text-break">Tipo</label>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="monto" className="fs-5 text-break">Monto</label>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="descuento" className="fs-5 text-break">Descuento (%)</label>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-3">
                    <input type="checkbox" id="tipoHora" name="tipoHora" />
                    <label htmlFor="tipoHora" className="fs-5 text-break ml-3" for="tipoHora">Hora</label>
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="montoHora" name="montoHora" placeholder="500" />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="descuentoHora" name="descuentoHora" placeholder="10" />
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-3 text-Justify">
                    <input type="checkbox" id="tipoDia" name="tipoDia" />
                    <label htmlFor="tipoDia" className="fs-5 text-break ml-3" for="tipoDia">Día</label>
                </div>
                <div className="col-md-4 mb-3 text-center">
                    <input type="number" min={0} className="form-control" id="montoDia" name="montoDia" placeholder="3000" />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="descuentoDia" name="descuentoDia" placeholder="20" />
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-3">
                    <input type="checkbox" id="tipoMes" name="tipoMes" />
                    <label htmlFor="tipoMes" className="fs-5 text-break ml-3" for="tipoMes">Mes</label>
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="montoMes" name="montoMes" placeholder="20000" />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="descuentoMes" name="descuentoMes" placeholder="30" />
                </div>
            </div>

            <div className="text-center">
                <button className="btn btn-ok btn-lg w-50" type="submit">
                    Enviar
                </button>
            </div>
        </form>
    );
}

export default AltaEstacionamiento;
