import './Footer.css';
import React, { Fragment } from 'react';

function Footer() {
    return (
        <footer className='bg-footer'>
            {/* <div className="footer-top d-flex justify-content-around">
                <div className="footer-column">
                    <h3>Sitio</h3>
                    <ul>
                        <li><a href="#">Mapa</a></li>
                        <li><a href="#">Dueños</a></li>
                        <li><a href="#">Clientes</a></li>
                    </ul>
                </div
                <div className="footer-column">
                    <h3>Cuenta</h3>
                    <ul>
                        <li><a href="#">Registrarse</a></li>
                        <li><a href="#">Iniciar sesión</a></li>
                    </ul>
                </div>
            </div> */}
            <div className="footer-bottom text-center">
                <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" className="d-inline-block align-text-center img" />
                <p>&copy; 2023 Park Me Now. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;