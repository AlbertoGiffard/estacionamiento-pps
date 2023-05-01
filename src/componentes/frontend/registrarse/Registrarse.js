import './Registrarse.css';
import React, { Fragment, useState } from 'react';
import AltaEstacionamiento from '../../estacionamiento/forms/AltaEstacionamiento';
import AltaUsuario from '../../usuario/forms/AltaUsuario';

const Registrarse = () => {
    const [esCliente, setEsCliente] = useState(true);

    const toggleBotonCliente = (visibilidad) => {
        setEsCliente(visibilidad);
    }

    return (
        <div className="container container-registrarse d-flex align-items-center">
            <div className="principal-registrarse mx-auto">
                <div className="container-button d-flex justify-content-around">
                    <div>
                        <button className='btn btn-lg btn-cliente' onClick={() => toggleBotonCliente(true)}>
                            <span className="display-6">
                                CLIENTE
                            </span>
                        </button>
                    </div>
                    <div>
                        <button className='btn btn-lg btn-duenio' onClick={() => toggleBotonCliente(false)}>
                            <span className="display-6">
                                DUEÑO
                            </span>
                        </button>
                    </div>
                </div>
                <div className="container-form my-5">
                    <div className="row h-100 container-duenio">
                        {esCliente ? (
                            <>
                                <div className="col-md-4 fondo-izquierdo-cliente rounded-start d-flex flex-column justify-content-center align-items-center">
                                    <h1>
                                        CLIENTE
                                    </h1>
                                    <br />
                                    <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" className="d-inline-block align-text-center img-inicio" />
                                </div>
                                <div className="col-md-8 blur-bg formulario-registrarse rounded-end justify-content-center align-items-center">
                                    <AltaUsuario className="form-registrarse" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-md-4 fondo-izquierdo-duenio rounded-start d-flex flex-column justify-content-center align-items-center">
                                    <h1>
                                        DUEÑO
                                    </h1>
                                    <br />
                                    <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" className="d-inline-block align-text-center img-inicio" />
                                </div>
                                <div className="col-md-8 blur-bg formulario-registrarse rounded-end justify-content-center align-items-center">
                                    <AltaEstacionamiento className="form-registrarse" />
                                </div>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registrarse;