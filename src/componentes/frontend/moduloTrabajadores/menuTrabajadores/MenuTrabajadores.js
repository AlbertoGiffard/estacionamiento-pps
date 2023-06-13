import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cards from '../../../utilitarios/cards/Cards';
import { Roles } from '../../../usuario/Usuario';

const MenuTrabajadores = (props) => {
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const { user } = props;

    useEffect(() => {        
        if (userLocalStorage.rol !== Roles.DUENIO && userLocalStorage.rol !== Roles.ADMIN) {
            alert('Si no eres dueño no puedes ingresar');
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className="d-flex justify-content-around flex-wrap m-3">
            <Cards titulo="Nuevo Trabajador" mensaje="Crea un nuevo trabajador para alguno de tus estacionamientos" link="/dashboard/trabajadores/nuevoTrabajador" user={user} />
            <Cards titulo="Gestionar Trabajadores" mensaje="Haz un seguimiento de los trabajadores que tienes" link="/dashboard/trabajadores/gestionTrabajador" user={user} />
        </div>
    )
}

export default MenuTrabajadores