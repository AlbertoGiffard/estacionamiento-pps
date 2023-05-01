import { Link } from 'react-router-dom';
import './Login.css';
import React, { Fragment, useState } from 'react';

const Login = () => {
    const [datos, setDatos] = useState({
        email: "",
        contrasenia: "",
        validarContrasenia: ""
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
        <div className="container container-login d-flex align-items-center">
            <div className="principal mx-auto">

                <div className="row h-100">
                    <div className="col-md-4 fondo-izquierdo rounded-start d-flex justify-content-center align-items-center">
                        <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" className="d-inline-block align-text-center img-inicio" />
                    </div>
                    <div className="col-md-8 blur-bg formulario rounded-end justify-content-center align-items-center">
                        <form className="needs-validation align-self-center my-auto h-100" onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label htmlFor="email" className="fs-4">Email</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="correo@mail.com" value={datos.email} required />
                                <div className="invalid-feedback">
                                    Por favor ingrese un email válido.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasenia" className="fs-4">Contraseña</label>
                                <input type="password" className="form-control" id="contrasenia" name="contrasenia" value={datos.contrasenia} required />
                            </div>
                            <div className="text-center">
                                {/* test */}
                                <Link to="/dashboard" className="nav-link active">
                                    <button className="btn btn-ok btn-lg w-50 mb-1" type="submit">
                                        Ingresar
                                    </button>
                                </Link>
                                <div className="container-registrarse d-flex align-items-center justify-content-start">
                                    <span className=''>Eres nuevo?</span>
                                    <Link to="/registrarse" className="nav-link active">
                                        <a className='text-primary ml-3'>Registrarse</a>
                                    </Link>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login;