import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MenuReserva from '../moduloReserva/menuReserva/MenuReserva';
import NuevaReserva from '../moduloReserva/nuevaReserva/NuevaReserva';
import MenuLateral from '../../utilitarios/menuLateral/MenuLateral';
import Firebase from '../../firebase/Firebase';

const Dashboard = () => {
    const location = useLocation();
    const [emailUser, setEmailUser] = useState(location.state && location.state.email);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem("userData"));

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

        console.log("dashboard", localStorage.getItem("userData"));
    }, []); // arreglo vacío de dependencias para ejecutar el useEffect solo una vez


    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <MenuLateral />
            </div>
            <div className="container col-md-9">
                <Routes path="/dashboard/*">
                    <Route path="/" element={<MenuReserva user={userData} />} />
                    <Route path="/nuevaReserva" element={<NuevaReserva user={userData} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;