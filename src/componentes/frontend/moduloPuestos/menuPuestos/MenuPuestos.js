import React, { useEffect } from 'react'
import Cards from '../../../utilitarios/cards/Cards';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../../usuario/Usuario';

const MenuPuestos = (props) => {
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const { user } = props;

    useEffect(() => {
        if (userLocalStorage.rol === Roles.CLIENTE) {
            alert('Si eres cliente no puedes ingresar');
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
        {/* <Cards titulo="Nuevo Puesto" mensaje="Crea nuevos puestos" link="/dashboard/puestos/nuevoPuesto" user={user} /> */}
        <Cards titulo="Gestionar Puestos" mensaje="Haz un seguimiento de los puestos que tienes por estacionamiento" link="/dashboard/puestos/gestionPuesto" user={user} />
    </div>
    )
}

export default MenuPuestos