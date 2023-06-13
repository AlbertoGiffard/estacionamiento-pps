import './MenuReserva.css';
import React, { Fragment, useState } from 'react';
import Cards from '../../../utilitarios/cards/Cards';
import { Roles } from '../../../usuario/Usuario';

const MenuReserva = (props) => {
    const { user } = props;

    const autorizado = () => {
        console.log(user);
        let resultado = false;

        if (user.rol !== Roles.CLIENTE) {
            resultado = true;
        }

        return resultado;
    }

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nueva Reserva" mensaje="Crea nuevas reservas para tus vehiculos" link="/dashboard/nuevaReserva" user={user} />
            <Cards titulo="Gestionar Reserva" mensaje="Haz un seguimiento de todas las reservas que has realizado historicamente" link="/dashboard/gestionReserva" user={user} />
            {
                autorizado() ?
                    <Cards titulo="Gestionar Reservas de estacionamiento" mensaje="Haz un seguimiento de las reservas por estacionamiento" link="/dashboard/gestionReservaTrabajadores" user={user} />
                    :
                    null
            }
        </div>
    )
}

export default MenuReserva;