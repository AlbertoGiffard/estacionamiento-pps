import './Inicio.css'
import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AltaEstacionamiento from '../estacionamiento/forms/AltaEstacionamiento';
import { Link } from 'react-router-dom';
import Mapa from '../frontend/mapa/Mapa';

function Inicio() {
    return (
        <div className='bg-sitio'>
            <div className="d-flex justify-content-around align-items-center bg-seccion-principal">
                <div className="align-items-center m-3 justify-content-around flex-wrap">
                    <div className="mb-5 text-center">
                        <h2>
                            ENCUENTRA TU LUGAR EN CUALQUIER PARTE
                        </h2>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                        <div className="bg-secundario p-2 border border-3 card">
                            <div className="text-center">
                                <span className="text-wrap card-title">
                                    Puestos de estacionamiento
                                    <br />
                                    donde quiera que estes.
                                </span>
                                <br />
                                <i className="bi bi-car-front-fill lg-icon"></i>
                            </div>
                        </div>
                        <div className="bg-secundario p-2 border border-3 card">
                            <div className="text-center">
                                <span className="text-wrap card-title">
                                    Realiza reservas de forma online
                                    <br />
                                    y llega sin preocupaciones.
                                </span>
                                <br />
                                <i className="bi bi-calendar-check lg-icon"></i>
                            </div>
                        </div>
                        <div className="bg-secundario p-2 border border-3 card">
                            <div className="text-center">
                                <span className="text-wrap card-title">
                                    Como dueño ingresa a la red mas
                                    <br />
                                    grande de clientes y hazte notar.
                                </span>
                                <br />
                                <i className="bi bi-person-add lg-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-items-center m-3">
                    <div className="text-center">
                        <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" className="d-inline-block align-text-center img-inicio" />
                    </div>
                    <div className="text-center py-2 pb-5">
                        <span className="display-6">
                            Park Me Now
                        </span>
                    </div>
                    <div className="text-center d-grid gap-2 col-6 mx-auto">
                        <Link to="/login" className="nav-link active">
                            <button type="button" className="btn btn-ok btn-lg border border-2 btn-ingresar">
                                Ingresar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container align-items-center">
                    <span className='display-1 margin-right'>
                        Estacionamientos Disponibles
                    </span>
                    <div className="d-flex justify-content-start">
                        <form className="d-flex search-bar input-group flex-grow-1">
                            <input className="form-control me-2" type="search" placeholder="Indique dirección, Ejemplo: Gotham 345" aria-label="Buscar" />
                            <button className="btn btn-ok flex-shrink-0 btn-md btn-more-lg" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
                <Mapa/>
                {/* <div className="container d-flex container-mapa justify-content-around text-center my-3">
                    <div className="mapa py-3 pt-0 margin-right-md">
                        <GoogleMap />
                    </div>
                    <div>
                        <div className=''>
                            <div className="list-group scrolleable-list blur-bg">
                                <div className="list-group-item list-group-item-action bg-transparent" aria-current="true">
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p className="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                </div>
                            </div>
                            <div className="text-center d-grid gap-2 mx-auto p-3">
                                <button type="button" className="btn btn-ok btn-lg">
                                    <Link to="/login" className="nav-link active">
                                        Reservar
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="container container-duenio">
                    <div className='display-1 margin-right margin-bottom-md'>
                        <span>
                            Dueños
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div>
                                <h3>
                                    Información
                                </h3>
                                <p className='text-wrap fw-medium text-justify'>
                                    Si tu objetivo es hacer que tu negocio crezca, conseguir mas clientes y facilitar el proceso de reservas de tu estacionamiento, somos la mejor solución. Brindamos una plataforma web que por una suscripción te brindamos nuestra red de usuarios, donde pueden encontrar tu estacionamiento y realizar reservas online; brindandole al usuario toda la Información al respecto de su reserva generada.
                                </p>
                            </div>
                            <div className="accordion accordion-flush bg-transparent" id="acordeonPreguntasDuenio">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Tiene costo suscribirme?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div className="accordion-body">
                                            <span className="text-sm">
                                                Si, por tan solo $500 pesos argentinos mensuales podrás utilizar nuestros servicios y se te cobrará de forma mensual el día que te diste de alta.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Puedo cargar a mis empleados?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div className="accordion-body">
                                            <span className="text-sm">
                                                Si, lo puedes hacer, cuando ingreses al sistema en tu página principal podrás encontrar un apartado donde podrás dar de alta a tus empleados.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Puedo indicar mis tipos de tarifas y descuentos?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div className="accordion-body">
                                            <span className="text-sm">
                                                Si, lo puedes hacer, siempre que quieras.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Cómo cargo mi estacionamiento?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div className="accordion-body">
                                            <span className="text-sm">
                                                Adelante estas a tan solo un paso de formar parte de la red de clientes de estacionamiento más grande que hay. Justo a la derecha tienes el formulario donde evaluaremos tu caso y te haremos llegar nuestra respuesta.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 mb-3 border-start border-dark">
                            <AltaEstacionamiento />
                        </div>
                    </div>
                </div>
                <div className="container container-cliente">
                    <div className='container display-1 margin-right margin-bottom-md'>
                        <span>
                            Clientes
                        </span>
                    </div>
                    <div className="row">
                        <div className="container col-md-8 mb-3">
                            <div className='container'>
                                <h3>
                                    Información
                                </h3>
                                <p className='text-wrap fw-medium text-justify'>
                                    Queremos ayudarte a que encuentres de forma rápida y eficaz un puesto de estacionamiento a donde te quieras dirigir. Lo mejor? es gratis y online, prueba nuestro mapa interactivo más arriba donde podras encontrar todos los estacionamientos disponibles en nuestra red.
                                    <br />
                                    Si eres nuevo, te damos la bienvenida!, en la esquina superior derecha podrás crearte una nueva cuenta de forma sencilla y rápida para que comiences y realices tu primer reserva justo ahora.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 position-relative p-0 m-0">
                            <div className="bg-image-cliente p-0 m-0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio;
