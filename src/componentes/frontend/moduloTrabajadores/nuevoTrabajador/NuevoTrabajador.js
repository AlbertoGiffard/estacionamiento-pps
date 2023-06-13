import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Usuario, { Roles, StatusUsuario } from '../../../usuario/Usuario';
import Firebase from '../../../firebase/Firebase';

const NuevoTrabajador = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        dni: 0,
        email: "",
        telefono: 0,
        contrasenia: "",
        validarContrasenia: "",
        direccion: "",
        rol: Roles.EMPLEADO,
        fechaAlta: Date.now(),
        status: StatusUsuario.ACTIVO,
        idEstacionamiento: ""
    });

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
            });

    }, [])

    useEffect(() => {
        if (estacionamientos.length) {
            setEstacionamientoSeleccionado(estacionamientos[0]);

            setDatos((prevDatos) => ({
                ...prevDatos,
                idEstacionamiento: estacionamientos[0].idEstacionamiento
            }))
        }
    }, [estacionamientos])


    const handleChange = (event) => {
        const { name, value } = event.target;

        let updatedDatos = {
            ...datos,
            [name]: value
        };
        setDatos(updatedDatos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarioComponent = new Usuario(datos);

        usuarioComponent.registrarse()
            .then(() => {
                alert('Usuario creado exitosamente recuerda informar al nuevo trabajador de ingresar con su email y esta contraseña');
                navigate('/dashboard/trabajadores');
            })
            .catch((error) => {
                console.error("usuario", error);
            })
    }

    return (
        <div className='container-dashboard h-100'>
            <div className="text-center">
                <span className="display-3 fw-bold">
                    Nuevo Trabajador
                </span>
            </div>
            <div className="container col-md-9">
                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="d-flex flex-row justify-content-around row">
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Nombre
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} value={datos.nombre} name='nombre' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Apellido
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} value={datos.apellido} name='apellido' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        DNI
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} value={datos.dni} name='dni' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Email
                                    </span>
                                    <input className='form-control' type="email" onChange={handleChange} value={datos.email} name='email' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Telefono
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} name='telefono' value={datos.telefono} />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Dirección
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} name='direccion' value={datos.direccion} />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Contraseña
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} name='contrasenia' value={datos.contrasenia} />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        Validar contraseña
                                    </span>
                                    <input className='form-control' type="text" onChange={handleChange} value={datos.validarContrasenia} name='validarContrasenia' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-4">
                                    <span className='fs-5 text-break'>
                                        ¿Estacionamiento?
                                    </span>
                                    <select className="form-select" onChange={handleChange} name='estacionamiento' value={datos.idEstacionamiento}>
                                        {
                                            estacionamientos.map((estacionamiento) => {
                                                return (
                                                    <option key={estacionamiento.idEstacionamiento} value={estacionamiento.idEstacionamiento}>{estacionamiento.nombreEstacionamiento}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3 row">
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

export default NuevoTrabajador