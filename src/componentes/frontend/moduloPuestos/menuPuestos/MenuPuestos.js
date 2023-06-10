import React from 'react'
import Cards from '../../../utilitarios/cards/Cards';

const MenuPuestos = (props) => {
    const {user} = props;

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
        <Cards titulo="Nuevo Puesto" mensaje="Crea nuevos puestos" link="/dashboard/puestos/nuevoPuesto" user={user} />
        <Cards titulo="Gestionar Puestos" mensaje="Haz un seguimiento de los puestos que tienes por estacionamiento" link="/dashboard/puestos/gestionPuesto" user={user} />
    </div>
    )
}

export default MenuPuestos