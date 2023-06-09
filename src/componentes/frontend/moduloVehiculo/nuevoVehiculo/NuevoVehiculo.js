import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Vehiculo, { StatusVehiculo } from '../../../vehiculo/Vehiculo';
import Firebase from '../../../firebase/Firebase';
import MenuLateral from '../../../utilitarios/menuLateral/MenuLateral';

const NuevoVehiculo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [habilitado, setHabilitado] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);
    const [datos, setDatos] = useState({
        idVehiculo: uuid(),
        usuario: userLocalStorage,
        marca: "",
        modelo: "",
        patente: "",
        tipo: "",
        color: "",
        totalReservas: 0,
        status: StatusVehiculo.INACTIVO
    });

    useEffect(() => {
        const firebase = new Firebase();
        firebase.obtenerValorPorUnCampoEspecifico('vehiculos', 'usuario.email', userLocalStorage.email)
            .then((vehiculos) => {
                let count = 0;
                //setVehiculos((datos) => ({ ...datos, vehiculos: vehiculos }));
                if (vehiculos[0] !== undefined) {
                    setVehiculos([vehiculos]);

                    //setea si el status sera activo o inactivo
                    vehiculos.forEach((vehiculo) => {
                        if (vehiculo.status === 'ACTIVO' || vehiculo.status === 'EN_PUESTO') {
                            count++;
                        }
                    })
                }

                if (count < 3) {
                    setDatos((prevDatos) => ({
                        ...prevDatos,
                        status: StatusVehiculo.ACTIVO
                    }))
                }
                console.log(vehiculos);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;

        let updatedDatos = {
            ...datos,
            [name]: value
        };
        setDatos(updatedDatos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const vehiculoComponent = new Vehiculo(datos);

        vehiculoComponent.registrar()
            .then(() => {
                alert('Vehiculo creado exitosamente');
                navigate('/dashboard/vehiculos');
            })
            .catch((error) => {
                console.error("vehiculo", error);
            })
    }

    return (
        <div className='container-dashboard h-100'>
            <div className="text-center">
                <span className="display-3 fw-bold">
                    Nuevo Vehiculo
                </span>
            </div>
            <div className="container col-md-9">
                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="d-flex flex-row justify-content-around row">
                                <div className="box d-flex flex-column justify-content-around col-md-6">
                                    <span>
                                        Marca
                                    </span>
                                    <input type="text" onChange={handleChange} value={datos.marca} name='marca' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-6">
                                    <span>
                                        Modelo
                                    </span>
                                    <input type="text" onChange={handleChange} value={datos.modelo} name='modelo' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-6">
                                    <span>
                                        Patente
                                    </span>
                                    <input type="text" onChange={handleChange} value={datos.patente} name='patente' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-6">
                                    <span>
                                        Tipo
                                    </span>
                                    <select className="form-select" onChange={handleChange} name='tipo' value={datos.tipo}>
                                        <option value="Bicicleta">Bicicleta</option>
                                        <option value="Moto">Moto</option>
                                        <option value="Auto">Auto</option>
                                        <option value="Camioneta">Camioneta</option>
                                    </select>
                                </div>
                                <div className="box d-flex flex-column justify-content-around col-md-6">
                                    <span>
                                        Color
                                    </span>
                                    <input type="text" onChange={handleChange} name='color' value={datos.color} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3 row">
                            <div className="d-flex justify-content-around align-items-center">
                                <button className="btn btn-primary btn-lg btn-block btn-reserva" onClick={handleSubmit} type='button'>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NuevoVehiculo