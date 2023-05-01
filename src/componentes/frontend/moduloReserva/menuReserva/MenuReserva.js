import { Link } from 'react-router-dom';
import './MenuReserva.css';
import React, { Fragment, useState } from 'react';
import Cards from '../../../utilitarios/cards/Cards';

const MenuReserva = () => {

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nueva Reserva" mensaje="Crea nuevas reservas para tus vehiculos" link="/dashboard/nuevaReserva" />
            <Cards titulo="Cancelar Reserva" mensaje={`¿Realizaste una reserva y no llegas?\nNo te preocupes, procede a cancelar la reserva cuanto antes`} link="" />
            <Cards titulo="Gestionar Reserva" mensaje="Haz un seguimiento de todas las reservas que has realizado historicamente" link="" />
        </div>
    )
}

export default MenuReserva;