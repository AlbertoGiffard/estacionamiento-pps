import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import React, { Fragment, useState } from 'react';
import Firebase from '../../firebase/Firebase';
import { StatusUsuario } from '../../usuario/Usuario';

const Login = () => {
    const [datos, setDatos] = useState({
        email: "",
        contrasenia: "",
        validarContrasenia: ""
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        });
    };

    const validarUsuarioActivo = () => {
        const firebase = new Firebase();

        return firebase.buscarDocumentoPorCampo('usuarios', 'email', datos.email)
            .then((dataUsuario) => {
                if (dataUsuario[0] === null || dataUsuario[0].status !== StatusUsuario.ACTIVO) {
                    alert('Error: Su cuenta no se encuentra activa regularice su situación');
                    return false;
                }
                return true;
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        validarUsuarioActivo()
            .then((usuarioActivo) => {
                if (usuarioActivo) {
                    const firebase = new Firebase();
                    firebase.iniciarSesion(datos.email, datos.contrasenia)
                        .then(() => {
                            console.log("todo un exito");
                            navigate('/dashboard/', { state: { email: datos.email } });
                        })
                        .catch((error) => {
                            console.error("error inicio sesion " + error);
                            alert("error inicio sesion " + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
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
                                <input type="email" className="form-control" id="email" name="email" placeholder="correo@mail.com" value={datos.email} required onChange={handleChange} />
                                <div className="invalid-feedback">
                                    Por favor ingrese un email válido.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasenia" className="fs-4">Contraseña</label>
                                <input type="password" className="form-control" id="contrasenia" name="contrasenia" value={datos.contrasenia} onChange={handleChange} required />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-ok btn-lg w-50 mb-1" type="submit">
                                    Ingresar
                                </button>
                                <div className="container-registrarse d-flex align-items-center justify-content-start">
                                    <span className=''>Eres nuevo?</span>
                                    <Link to="/registrarse" className="nav-link active">
                                        <span className='text-primary ml-3'>Registrarse</span>
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