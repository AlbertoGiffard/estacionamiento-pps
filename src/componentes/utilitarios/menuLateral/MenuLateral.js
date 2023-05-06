import './MenuLateral.css';
import { Link } from 'react-router-dom';
import React from 'react';

const MenuLateral = (props) => {
    return (
        <ul className="list-group list-group-dashboard bg-list list-group-flush">
            <Link to="/dashboard">
                <li className="list-group-item text-white fs-5">
                    <i className="bi bi-calendar-plus md-icon"></i> Reservas
                </li>
            </Link>
            <li class="list-group-item text-white fs-5"><i className="bi bi-car-front md-icon"></i> Vehiculos</li>
            <li class="list-group-item text-white fs-5"><i className="bi bi-geo-alt md-icon"></i> Mapa</li>
            <li class="list-group-item text-white fs-5"><i className="bi bi-p-square md-icon"></i> Estacionamientos</li>
            <li class="list-group-item text-white fs-5"><i className="bi bi-bicycle md-icon"></i> Puestos</li>
            <li class="list-group-item text-white fs-5"><i className="bi bi-person-square md-icon"></i> Mi Perfil</li>
        </ul>
    )
}

export default MenuLateral;