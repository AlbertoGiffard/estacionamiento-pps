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
            <Link to="/dashboard/vehiculos">
                <li className="list-group-item text-white fs-5">
                    <i className="bi bi-car-front md-icon"></i> Vehiculos
                </li>
            </Link>
            <Link to="/dashboard/mapa">
                <li className="list-group-item text-white fs-5"><i className="bi bi-geo-alt md-icon"></i> Mapa</li>
            </Link>
            <Link to="/dashboard/estacionamientos">
                <li className="list-group-item text-white fs-6"><i className="bi bi-p-square md-icon"></i> Estacionamientos</li>
            </Link>
            <Link to="/dashboard/puestos">
                <li className="list-group-item text-white fs-5"><i className="bi bi-bicycle md-icon"></i> Puestos</li>
            </Link>
            <Link to="/dashboard/perfil">
                <li className="list-group-item text-white fs-5"><i className="bi bi-person-square md-icon"></i> Mi Perfil</li>
            </Link>
        </ul>
    )
}

export default MenuLateral;