import { Link } from 'react-router-dom';
import './Dashboard.css';
import React, { Fragment, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuReserva from '../moduloReserva/menuReserva/MenuReserva';
import NuevaReserva from '../moduloReserva/nuevaReserva/NuevaReserva';

const Dashboard = () => {


    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <ul class="list-group list-group-dashboard bg-list list-group-flush">
                    <li class="list-group-item text-white fs-5"><i className="bi bi-calendar-plus md-icon"></i> Reservas</li>
                    <li class="list-group-item text-white fs-5"><i className="bi bi-car-front md-icon"></i> Vehiculos</li>
                    <li class="list-group-item text-white fs-5"><i className="bi bi-geo-alt md-icon"></i> Mapa</li>
                    <li class="list-group-item text-white fs-5"><i className="bi bi-p-square md-icon"></i> Estacionamientos</li>
                    <li class="list-group-item text-white fs-5"><i className="bi bi-bicycle md-icon"></i> Puestos</li>
                    <li class="list-group-item text-white fs-5"><i className="bi bi-person-square md-icon"></i> Mi Perfil</li>
                </ul>
            </div>
            <div className="container col-md-9">
                <Routes >
                    <Route path="/" element={<MenuReserva />} />
                    <Route path="/nuevaReserva" element={<NuevaReserva />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;