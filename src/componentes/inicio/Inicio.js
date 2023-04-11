import './Inicio.css'
import React, { Fragment } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

function Inicio() {
    return (
        <div className='bg-sitio'>
            <div class="d-flex justify-content-around align-items-center bg-seccion-principal">
                <div class="align-items-center m-3 justify-content-around flex-wrap">
                    <div className="mb-5 text-center">
                        <h2>
                            ENCUENTRA TU LUGAR EN CUALQUIER PARTE
                        </h2>
                    </div>
                    <div class="d-flex justify-content-around align-items-center">
                        <div className="bg-secundario p-2 border border-3 card">
                            <div className="text-center">
                                <span className="text-wrap card-title">
                                    Puestos de estacionamiento
                                    <br />
                                    donde quiera que estes.
                                </span>
                                <br />
                                <i class="bi bi-car-front-fill lg-icon"></i>
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
                                <i class="bi bi-calendar-check lg-icon"></i>
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
                                <i class="bi bi-person-add lg-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="align-items-center m-3">
                    <div className="text-center">
                        <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" class="d-inline-block align-text-center img-inicio" />
                    </div>
                    <div className="text-center py-2 pb-5">
                        <span className="display-6">
                            Multi Espacios
                        </span>
                    </div>
                    <div className="text-center d-grid gap-2 col-6 mx-auto">
                        <button type="button" class="btn btn-ok btn-lg border border-2 btn-ingresar">
                            Ingresar
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container align-items-center">
                    <span className='display-1 margin-right'>
                        Estacionamientos Disponibles
                    </span>
                    <div class="d-flex justify-content-start">
                        <form class="d-flex search-bar input-group flex-grow-1">
                            <input class="form-control me-2" type="search" placeholder="Indique dirección, Ejemplo: Gotham 345" aria-label="Buscar" />
                            <button class="btn btn-ok flex-shrink-0 btn-md btn-more-lg" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
                <div className="container d-flex container-mapa justify-content-around text-center my-3">
                    <div className="mapa py-3 margin-right-md">
                        <span className="display-1 ">
                            MAPA
                        </span>
                    </div>
                    <div>
                        <div className=''>
                            <div class="list-group scrolleable-list blur-bg">
                                <div class="list-group-item list-group-item-action bg-transparent" aria-current="true">
                                    {/* esto tiene que ser un componente separado de por si (item) al igual que el listado */}
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                    <Fragment>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">Nombre Estacionamiento</h5>
                                            <small className='margin-left-sm'>Barrio</small>
                                        </div>
                                        <p class="mb-1">Dirección</p>
                                        <small>tipos de estadia</small>
                                        <hr />
                                    </Fragment>
                                </div>
                            </div>
                            <div className="text-center d-grid gap-2 mx-auto p-3">
                                <button type="button" class="btn btn-ok btn-lg">
                                    Reservar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container container-duenio">
                    <div className='display-1 margin-right margin-bottom-md'>
                        <span>
                            Dueños
                        </span>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div>
                                <h3>
                                    Información
                                </h3>
                                <p className='text-wrap fw-medium text-justify'>
                                    Si tu objetivo es hacer que tu negocio crezca, conseguir mas clientes y facilitar el proceso de reservas de tu estacionamiento, somos la mejor solución. Brindamos una plataforma web que por una suscripción te brindamos nuestra red de usuarios, donde pueden encontrar tu estacionamiento y realizar reservas online; brindandole al usuario toda la Información al respecto de su reserva generada.
                                </p>
                            </div>
                            <div class="accordion accordion-flush bg-transparent" id="acordeonPreguntasDuenio">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Tiene costo suscribirme?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div class="accordion-body">
                                            <span className="text-sm">
                                                Si, por tan solo $500 pesos argentinos mensuales podrás utilizar nuestros servicios y se te cobrará de forma mensual el día que te diste de alta.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Puedo cargar a mis empleados?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div class="accordion-body">
                                            <span className="text-sm">
                                                Si, lo puedes hacer, cuando ingreses al sistema en tu página principal podrás encontrar un apartado donde podrás dar de alta a tus empleados.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Puedo indicar mis tipos de tarifas y descuentos?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div class="accordion-body">
                                            <span className="text-sm">
                                                Si, lo puedes hacer, siempre que quieras.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false">
                                            <span className="display-6 text-md">
                                                ¿Cómo cargo mi estacionamiento?
                                            </span>
                                        </button>
                                        <hr />
                                    </h2>
                                    <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#acordeonPreguntasDuenio">
                                        <div class="accordion-body">
                                            <span className="text-sm">
                                                Justo a la derecha tienes el formulario donde evaluaremos tu caso y te haremos llegar nuestra respuesta. Adelante estas a tan solo un paso de formar parte de la red de clientes de estacionamientomás grande que hay.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-6 mb-3 bg-formulario">
                            FORMULARIO
                        </div>
                    </div>
                </div>
                <div class="container container-cliente">
                    <div className='container display-1 margin-right margin-bottom-md'>
                        <span>
                            Clientes
                        </span>
                    </div>
                    <div class="row">
                        <div class="container col-md-8 mb-3">
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
                            <div class="bg-image-cliente p-0 m-0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inicio;
