import MenuLateral from '../../../utilitarios/menuLateral/MenuLateral';
import './NuevaReserva.css';
import React, { Fragment, useState } from 'react';

const NuevaReserva = () => {

    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <MenuLateral/>
            </div>
            <div className="container col-md-9">
                <span>NUEVA RESERVA</span>
            </div>
        </div>
    )
}

export default NuevaReserva;