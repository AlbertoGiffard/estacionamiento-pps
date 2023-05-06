import { Link } from 'react-router-dom';
import './Dashboard.css';
import React, { Fragment, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuReserva from '../moduloReserva/menuReserva/MenuReserva';
import NuevaReserva from '../moduloReserva/nuevaReserva/NuevaReserva';
import MenuLateral from '../../utilitarios/menuLateral/MenuLateral';

const Dashboard = () => {


    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <MenuLateral/>
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