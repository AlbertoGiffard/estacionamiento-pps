import './Header.css';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {


    return (
        <Fragment>
            <nav class="navbar bg-body-tertiary bg-inicio">
                <div class="container-fluid">
                    <a class="navbar-brand d-flex align-text-center align-items-center">
                        <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" class="d-inline-block align-text-center img" />
                        <Link to="/" class="nav-link active">
                            <span class='ml-3 text-center'>
                                Park Me Now
                            </span>

                        </Link>
                    </a>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <Link to="login" class="nav-link active" aria-current="page">Iniciar Sesión</Link>
                                    </li>
                                    {/* Si el usuario inicio sesión desaparecen las dos de arriba por las siguientes dos */}
                                    {/* <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Mi perfil</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Cerrar Sesión</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header;