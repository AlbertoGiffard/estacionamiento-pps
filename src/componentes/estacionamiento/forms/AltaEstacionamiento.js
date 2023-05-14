import './AltaEstacionamiento.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Estacionamiento, { StatusEstacionamiento } from '../Estacionamiento';

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
        tiposEstadia: {
            hora: {
                monto: 0,
                descuento: 0,
                status: false
            },
            semana: {
                monto: 0,
                descuento: 0,
                status: false
            },
            mes: {
                monto: 0,
                descuento: 0,
                status: false
            },
        }
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedDatos = { ...datos };
        updatedDatos = {
            ...updatedDatos,
            [name]: value
        };
        validarCampos(updatedDatos);
        setDatos(updatedDatos);
    };

    const validarCampos = (data) => {
        let updatedDatos;

        if (data && datos.descuentoDia !== undefined && datos.descuentoDia !== "") {
            let valor = parseInt(datos.descuentoDia);
            updatedDatos = {
                ...datos,
                descuentoDia: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.descuentoHora !== "" && datos.descuentoHora !== undefined) {
            let valor = parseInt(datos.descuentoHora);
            updatedDatos = {
                ...datos,
                descuentoHora: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.descuentoMes !== "" && datos.descuentoMes !== undefined) {
            let valor = parseInt(datos.descuentoMes);
            updatedDatos = {
                ...datos,
                descuentoMes: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.disponibilidadMax !== "" && datos.disponibilidadMax !== undefined) {
            let valor = parseInt(datos.disponibilidadMax);
            updatedDatos = {
                ...datos,
                disponibilidadMax: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.montoDia !== "" && datos.montoDia !== undefined) {
            let valor = parseInt(datos.montoDia);
            updatedDatos = {
                ...datos,
                montoDia: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.montoHora !== "" && datos.montoHora !== undefined) {
            let valor = parseInt(datos.montoHora);
            updatedDatos = {
                ...datos,
                montoHora: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.montoMes !== "" && datos.montoMes !== undefined) {
            let valor = parseInt(datos.montoMes);
            updatedDatos = {
                ...datos,
                montoMes: valor
            };
            setDatos(updatedDatos);
        }
        if (data && datos.tipoDia === "on") {
            updatedDatos = {
                ...datos,
                tipoDia: true
            };
            setDatos(updatedDatos);
        } else {
            updatedDatos = {
                ...datos,
                tipoDia: false
            };
            setDatos(updatedDatos);
        }
        if (data && datos.tipoHora === "on") {
            updatedDatos = {
                ...datos,
                tipoHora: true
            };
            setDatos(updatedDatos);
        } else {
            updatedDatos = {
                ...datos,
                tipoHora: false
            };
            setDatos(updatedDatos);
        }
        if (data && datos.tipoMes === "on") {
            updatedDatos = {
                ...datos,
                tipoMes: true
            };
            setDatos(updatedDatos);
        } else {
            updatedDatos = {
                ...datos,
                tipoMes: false
            };
            setDatos(updatedDatos);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(datos);
        crearEstacionamiento();
    };

    const crearEstacionamiento = () => {
        const nuevoEstacionamiento = {
            idUsuario: uuid(),
            nombre: datos.nombre,
            apellido: datos.apellido,
            dni: datos.dni,
            email: datos.email,
            contrasenia: datos.contrasenia,
            datosTarjeta: null,
            telefono: datos.telefono,
            direccion: null,
            rol: datos.rol,
            foto: null,
            idEstacionamiento: uuid(),
            status: StatusEstacionamiento.PENDIENTE,
            descuentoDia: datos.descuentoDia || null,
            descuentoHora: datos.descuentoHora || null,
            descuentoMes: datos.descuentoMes || null,
            direccionEstacionamiento: datos.direccionEstacionamiento,
            disponibilidadMax: datos.disponibilidadMax,
            montoDia: datos.montoDia || null,
            montoHora: datos.montoHora || null,
            montoMes: datos.montoMes || null,
            nombreEstacionamiento: datos.nombreEstacionamiento,
            tipoDia: datos.tipoDia || null,
            tipoHora: datos.tipoHora || null,
            tipoMes: datos.tipoMes || null
        };

        const estacionamientoComponent = new Estacionamiento(nuevoEstacionamiento); // crea una instancia del componente Usuario con los datos del nuevo usuario

        estacionamientoComponent.registrar().then(() => {
            console.log("todo un exito");
            navigate('/dashboard/');
        })
            .catch((error) => {
                // Manejar errores aquí
                console.error("usuario" + error);
            });
    }

    return (
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="nombreDuenio" className="fs-4">Nombre</label>
                    <input type="text" className="form-control" id="nombreDuenio" name="nombre" placeholder="Junior" value={datos.nombre} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese su nombre.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="apellido" className="fs-4">Apellido</label>
                    <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Prueba" value={datos.apellido} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese su apellido.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="dni" className="fs-4">DNI</label>
                    <input type="number" max={98000000} min={1000000} className="form-control" id="dni" name="dni" placeholder="12345678" required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un DNI válido.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="fs-4">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="correo@mail.com" value={datos.email} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un email válido.
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="telefono" className="fs-4">Teléfono</label>
                    <input type="number" max={1199999999} min={1100000001} className="form-control" id="telefono" name="telefono" placeholder="1188994455" required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un telefono válido.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="contrasenia" className="fs-4">Contraseña</label>
                    <input type="password" className="form-control" id="contrasenia" name="contrasenia" value={datos.contrasenia} required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="validarContrasenia" className="fs-4">Repetir Contraseña</label>
                    <input type="password" className="form-control" id="validarContrasenia" name="validarContrasenia" value={datos.validarContrasenia} required onChange={handleChange} />
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
                    <input type="text" className="form-control" id="nombreEstacionamiento" name="nombreEstacionamiento" placeholder="Estacionamiento" value={datos.nombreEstacionamiento} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un nombre válido.
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="direccionEstacionamiento" className="fs-4">Dirección</label>
                    <input type="text" className="form-control" id="direccionEstacionamiento" name="direccionEstacionamiento" placeholder="Gotham 123" value={datos.direccionEstacionamiento} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese una dirección válida.
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="disponibilidadMax" className="fs-4 text-break">Capacidad</label>
                    <input type="number" max={10000} min={0} className="form-control" id="disponibilidadMax" name="disponibilidadMax" placeholder="15" required onChange={handleChange} />
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
                    <input type="checkbox" id="tipoHora" name="tipoHora" onChange={handleChange} />
                    <label htmlFor="tipoHora" className="fs-5 text-break ml-3">Hora</label>
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="montoHora" name="montoHora" placeholder="500" onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="descuentoHora" name="descuentoHora" placeholder="10" onChange={handleChange} />
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-3 text-Justify">
                    <input type="checkbox" id="tipoDia" name="tipoDia" onChange={handleChange} />
                    <label htmlFor="tipoDia" className="fs-5 text-break ml-3">Día</label>
                </div>
                <div className="col-md-4 mb-3 text-center">
                    <input type="number" min={0} className="form-control" id="montoDia" name="montoDia" placeholder="3000" onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="descuentoDia" name="descuentoDia" placeholder="20" onChange={handleChange} />
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-3">
                    <input type="checkbox" id="tipoMes" name="tipoMes" onChange={handleChange} />
                    <label htmlFor="tipoMes" className="fs-5 text-break ml-3">Mes</label>
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="montoMes" name="montoMes" placeholder="20000" onChange={handleChange} />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="number" min={0} className="form-control" id="descuentoMes" name="descuentoMes" placeholder="30" onChange={handleChange} />
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
