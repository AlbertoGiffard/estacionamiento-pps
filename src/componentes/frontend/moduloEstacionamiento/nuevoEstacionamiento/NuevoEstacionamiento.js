import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Estacionamiento, { StatusEstacionamiento } from '../../../estacionamiento/Estacionamiento';

const NuevoEstacionamiento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [datos, setDatos] = useState({
        idUsuario: userLocalStorage.idUsuario,
        nombre: userLocalStorage.nombre,
        apellido: userLocalStorage.apellido,
        dni: userLocalStorage.dni,
        email: userLocalStorage.email,
        direccion: userLocalStorage.direccion,
        rol: userLocalStorage.rol,
        telefono: userLocalStorage.telefono,
        datosTarjeta: userLocalStorage.datosTarjeta,
        contrasenia: userLocalStorage.contrasenia,
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
        console.log('datos', datos);
        crearEstacionamiento();
    };

    const crearEstacionamiento = () => {
        const nuevoEstacionamiento = {
            idUsuario: datos.idUsuario,
            nombre: datos.nombre,
            apellido: datos.apellido,
            dni: datos.dni,
            email: datos.email,
            contrasenia: datos.contrasenia,
            datosTarjeta: datos.datosTarjeta,
            telefono: datos.telefono,
            rol: datos.rol,
            direccion: datos.direccion,
            nombreEstacionamiento: datos.nombreEstacionamiento,
            descuentoDia: datos.descuentoDia || null,
            descuentoHora: datos.descuentoHora || null,
            descuentoMes: datos.descuentoMes || null,
            direccionEstacionamiento: datos.direccionEstacionamiento,
            disponibilidadMax: datos.disponibilidadMax,
            montoDia: datos.montoDia || null,
            montoHora: datos.montoHora || null,
            montoMes: datos.montoMes || null,
            tipoDia: datos.tipoDia || null,
            tipoHora: datos.tipoHora || null,
            tipoMes: datos.tipoMes || null
        };

        const estacionamientoComponent = new Estacionamiento(nuevoEstacionamiento); // crea una instancia del componente Usuario con los datos del nuevo usuario

        estacionamientoComponent.registrar().then(() => {
            console.log("todo un exito");
            alert('Estacionamiento creado exitosamente');
            navigate('/dashboard/estacionamientos');
        })
            .catch((error) => {
                // Manejar errores aquí
                console.error("estacionamiento" + error);
            });
    }

    return (
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="row">
            <div className="text-center">
                <span className="display-3 fw-bold">
                    Nuevo Estacionamiento
                </span>
            </div>
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
                <button className="btn btn-primary btn-lg w-50" type="submit">
                    Enviar
                </button>
            </div>
        </form>
    )
}

export default NuevoEstacionamiento