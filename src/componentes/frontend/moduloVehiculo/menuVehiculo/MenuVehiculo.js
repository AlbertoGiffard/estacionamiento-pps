import React, { useEffect } from 'react'
import Cards from '../../../utilitarios/cards/Cards';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../../usuario/Usuario';

const MenuVehiculo = (props) => {
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const { user } = props;

/*     useEffect(() => {

        if (userLocalStorage.rol === Roles.DUENIO || userLocalStorage.rol === Roles.EMPLEADO) {
            alert('Solo los clientes pueden ingresar');
            navigate('/dashboard');
        }
    }, []) */
    

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nuevo Vehiculo" mensaje="Crea nuevos vehiculos" link="/dashboard/vehiculos/nuevoVehiculo" user={user} />
            <Cards titulo="Gestionar Vehiculos" mensaje="Haz un seguimiento de los vehiculos que tienes, recuerda que solo puedes tener 3 activos" link="/dashboard/vehiculos/gestionVehiculo" user={user} />
        </div>
    )
}

export default MenuVehiculo