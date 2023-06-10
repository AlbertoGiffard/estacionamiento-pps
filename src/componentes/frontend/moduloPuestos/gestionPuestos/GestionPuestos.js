import React, { useEffect, useState } from 'react'
import Firebase from '../../../firebase/Firebase';
import { useLocation, useNavigate } from 'react-router-dom';

const GestionPuestos = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
    const [datos, setDatos] = useState({
        idEstacionamiento: "",
        tipoVehiculos: []
    });
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [puestosOriginal, setPuestosOriginal] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();
        firebase.obtenerValorEnDB('estacionamientos')
            .then((dataEstacionamientos) => {
                setEstacionamientos(dataEstacionamientos);
                if (dataEstacionamientos[0] === undefined) {
                    setEstacionamientos(dataEstacionamientos);
                } else {
                    setEstacionamientos(dataEstacionamientos[0]);
                }
                estacionamientos.forEach((estacionamiento) => {
                    return firebase.obtenerPuestosEstacionamientoPorEstacionamiento(estacionamiento.idEstacionamiento)
                    .then((puestos) => {
                        if (puestos[0] === undefined) {
                            setPuestosOriginal(puestos);
                        } else {
                            setPuestosOriginal(puestos[0]);
                        }
                    })
                    .catch((error) => {
                        console.error('effect', error);
                    })
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    return (
        <div>GestionPuestos</div>
    )
}

export default GestionPuestos