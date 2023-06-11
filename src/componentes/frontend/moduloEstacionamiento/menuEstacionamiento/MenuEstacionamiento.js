import React, { useEffect } from 'react'
import Cards from '../../../utilitarios/cards/Cards';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../../usuario/Usuario';

const MenuEstacionamiento = (props) => {
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
            <Cards titulo="Nuevo Estacionamiento" mensaje="Crea nuevo estacionamiento" link="/dashboard/estacionamientos/nuevoEstacionamiento" user={user} />
            <Cards titulo="Gestionar Estacionamientos" mensaje="Haz un seguimiento de los estacionamientos que tienes" link="/dashboard/estacionamientos/gestionEstacionamiento" user={user} />
        </div>
    )
}

export default MenuEstacionamiento