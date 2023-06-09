import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MenuReserva from '../moduloReserva/menuReserva/MenuReserva';
import NuevaReserva from '../moduloReserva/nuevaReserva/NuevaReserva';
import MenuLateral from '../../utilitarios/menuLateral/MenuLateral';
import Firebase from '../../firebase/Firebase';
import GestionReserva from '../moduloReserva/gestionReserva/GestionReserva';
import MenuVehiculo from '../moduloVehiculo/menuVehiculo/MenuVehiculo';
import NuevoVehiculo from '../moduloVehiculo/nuevoVehiculo/NuevoVehiculo';
import GestionVehiculo from '../moduloVehiculo/gestionVehiculo/GestionVehiculo';

const Dashboard = () => {
    const location = useLocation();
    const [emailUser, setEmailUser] = useState(location.state && location.state.email);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
        console.log(userLocalStorage);
        if (userLocalStorage) {
            setUserData(userLocalStorage);
        } else {
            const firebase = new Firebase();

            firebase.obtenerValorPorUnCampoEspecifico('usuarios', 'email', emailUser)
                .then(data => {
                    setUserData(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                })
                .catch(error => {
                    console.log('Error al obtener los datos del usuario:', error);
                });
        }
    }, []); // arreglo vacío de dependencias para ejecutar el useEffect solo una vez


    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <MenuLateral />
            </div>
            <div className="container col-md-9">
                <Routes path="/dashboard/*">
                    <Route path="/" element={<MenuReserva user={userData} />} />
                    <Route path="/vehiculos" element={<MenuVehiculo user={userData} />} />
                    <Route path="/vehiculos/nuevoVehiculo" element={<NuevoVehiculo user={userData} />} />
                    <Route path="/vehiculos/gestionVehiculo" element={<GestionVehiculo user={userData} />} />
                    <Route path="/nuevaReserva" element={<NuevaReserva user={userData} />} />
                    <Route path="/gestionReserva" element={<GestionReserva user={userData} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;