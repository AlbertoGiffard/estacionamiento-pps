import React from 'react'
import Cards from '../../../utilitarios/cards/Cards';

const MenuEstacionamiento = (props) => {
    const { user } = props;

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nuevo Estacionamiento" mensaje="Crea nuevo estacionamiento" link="/dashboard/estacionamientos/nuevoEstacionamiento" user={user} />
            <Cards titulo="Gestionar Estacionamientos" mensaje="Haz un seguimiento de los estacionamientos que tienes" link="/dashboard/estacionamientos/gestionEstacionamiento" user={user} />
        </div>
    )
}

export default MenuEstacionamiento