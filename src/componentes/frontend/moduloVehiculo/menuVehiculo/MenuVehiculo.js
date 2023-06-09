import React from 'react'
import Cards from '../../../utilitarios/cards/Cards';

const MenuVehiculo = (props) => {
    const { user } = props;

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nuevo Vehiculo" mensaje="Crea nuevos vehiculos" link="/dashboard/vehiculos/nuevoVehiculo" user={user} />
            <Cards titulo="Gestionar Vehiculos" mensaje="Haz un seguimiento de los vehiculos que tienes, recuerda que solo puedes tener 3 activos" link="/dashboard/vehiculos/gestionVehiculo" user={user} />
        </div>
    )
}

export default MenuVehiculo