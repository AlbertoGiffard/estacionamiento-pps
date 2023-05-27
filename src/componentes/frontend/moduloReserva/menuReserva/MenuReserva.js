import './MenuReserva.css';
import React, { Fragment, useState } from 'react';
import Cards from '../../../utilitarios/cards/Cards';

const MenuReserva = (props) => {
    const {user} = props;

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nueva Reserva" mensaje="Crea nuevas reservas para tus vehiculos" link="/dashboard/nuevaReserva" user={user}/>
            <Cards titulo="Gestionar Reserva" mensaje="Haz un seguimiento de todas las reservas que has realizado historicamente" link="/dashboard/gestionReserva" user={user}/>
        </div>
    )
}

export default MenuReserva;