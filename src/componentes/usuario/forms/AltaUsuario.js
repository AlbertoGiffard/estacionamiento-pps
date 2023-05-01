import Vehiculo, { StatusVehiculo, TipoVehiculo } from '../../vehiculo/Vehiculo';
import Usuario, { Roles, StatusUsuario, registrarseUsuario } from '../Usuario';
import './AltaUsuario.css';
import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

const AltaUsuario = () => {
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        dni: 0,
        email: "",
        telefono: 0,
        contrasenia: "",
        validarContrasenia: "",
        direccion: "",
        datosTarjeta: {},
        rol: Roles.CLIENTE,
        fechaAlta: Date.now(),
        status: StatusUsuario.ACTIVO,
        marca: "",
        modelo: "",
        patente: "",
        tipo: "",
        color: "",
        statusVehiculo: StatusVehiculo.ACTIVO
    });
    const [submitted, setSubmitted] = useState(false);
    const [datosActualizados, setDatosActualizados] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedDatos = { ...datos };
        if (name === "tipo") {
            updatedDatos = {
                ...updatedDatos,
                tipo: value.toUpperCase()
            };
        } else {
            updatedDatos = {
                ...updatedDatos,
                [name]: value
            };
        }
        setDatos(updatedDatos);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        setDatosActualizados(true); // marcar los datos como no actualizados
        if (datos.tipo == "") {
            let updatedDatos = { ...datos };
            updatedDatos = {
                ...updatedDatos,
                tipo: TipoVehiculo.AUTO
            };
            setDatos(updatedDatos);
        }
        // comprobar si todos los datos están actualizados
        if (datos.tipo !== "") {
            // enviar los datos al servidor
            crearUsuario();
        } else {
            console.log("Error: algunos datos no han sido actualizados");
        }
    };

    const crearUsuario = () => {
        const nuevoUsuario = {
            idUsuario: uuid(),
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
            idEstacionamiento: null,
            status: datos.status
        };

        const usuarioComponent = <Usuario {...nuevoUsuario} />; // crea una instancia del componente Usuario con los datos del nuevo usuario
        /* QUe hacer aca?? */
        const { registrarse } = usuarioComponent //???

        registrarse.then(() => {
            const nuevoVehiculo = {
                idVehiculo: uuid(),
                usuario: nuevoUsuario,
                marca: datos.marca,
                modelo: datos.modelo,
                patente: datos.patente,
                tipo: datos.tipo,
                color: datos.color,
                status: StatusVehiculo.ACTIVO
            };
            const vehiculoComponent = <Vehiculo {...nuevoUsuario} />; // crea una instancia del componente Usuario con los datos del nuevo usuario
            const { registrar } = vehiculoComponent.props; 
            registrar()
                .then(() => {
                    console.log("todo un exito");
                })
                .catch((error) => {
                    // Manejar errores aquí
                    console.error("vehiculo" + error);
                });
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
                    <label htmlFor="nombreCliente" className="fs-4">Nombre</label>
                    <input type="text" className="form-control" id="nombreCliente" name="nombre" placeholder="Junior" value={datos.nombre} required onChange={handleChange} />
                    {!submitted && (
                        <div className="invalid-feedback">
                            Por favor ingrese su nombre.
                        </div>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="apellidoCliente" className="fs-4">Apellido</label>
                    <input type="text" className="form-control" id="apellidoCliente" name="apellido" placeholder="Prueba" value={datos.apellido} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese su apellido.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="dniCliente" className="fs-4">DNI</label>
                    <input type="number" max={98000000} min={1000000} className="form-control" id="dniCliente" name="dni" placeholder="12345678" required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un DNI válido.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="emailCliente" className="fs-4">Email</label>
                    <input type="email" className="form-control" id="emailCliente" name="email" placeholder="correo@mail.com" value={datos.email} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un email válido.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="telefonoCliente" className="fs-4">Teléfono</label>
                    <input type="number" max={1199999999} min={1100000001} className="form-control" id="telefonoCliente" name="telefono" placeholder="1188994455" required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un telefono válido.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="direccion" className="fs-4">Dirección</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Gotham 123" value={datos.direccion} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese una dirección válida.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="contraseniaCliente" className="fs-4">Contraseña</label>
                    <input type="password" className="form-control" id="contraseniaCliente" name="contrasenia" value={datos.contrasenia} required onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="validarContraseniaCliente" className="fs-4">Repetir Contraseña</label>
                    <input type="password" className="form-control" id="validarContraseniaCliente" name="validarContrasenia" value={datos.validarContrasenia} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Las contraseñas no coinciden.
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <label className="text-center fs-3 fw-bold">Vehiculo</label>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="marca" className="fs-4">Marca</label>
                    <input type="marca" className="form-control" id="marca" name="marca" placeholder="chevrolet" value={datos.marca} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese una marca válida.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="modelo" className="fs-4">Modelo</label>
                    <input type="modelo" className="form-control" id="modelo" name="modelo" placeholder="camaro" value={datos.modelo} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un modelo válido.
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="patente" className="fs-4">Patente</label>
                    <input type="patente" className="form-control" id="patente" name="patente" placeholder="123abc" value={datos.patente} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese una patente válida.
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="tipo" className="fs-4">Tipo</label>
                    <select class="form-select" name='tipo' onChange={handleChange}>
                        <option selected value={TipoVehiculo.AUTO}>Auto</option>
                        <option value={TipoVehiculo.CAMIONETA}>Camioneta</option>
                        <option value={TipoVehiculo.MOTO}>Moto</option>
                        <option value={TipoVehiculo.BICICLETA}>Bicicleta</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="color" className="fs-4">Color</label>
                    <input type="text" className="form-control" id="color" name="color" placeholder="rojo" value={datos.color} required onChange={handleChange} />
                    <div className="invalid-feedback">
                        Por favor ingrese un color válido.
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button className="btn btn-ok btn-lg w-50" type="button" onClick={handleSubmit}>
                    Enviar
                </button>
            </div>
        </form>
    )
}

export default AltaUsuario;