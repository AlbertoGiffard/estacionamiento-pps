import React, { useEffect, useState } from 'react'
import './GestionReserva.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Firebase from '../../../firebase/Firebase';
import { StatusPago, StatusReserva } from '../../../reserva/Reserva';

const GestionReserva = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();
        firebase.obtenerValorPorUnCampoEspecifico('reservas', 'usuario', userLocalStorage.email)
            .then((reservasDb) => {
                setReservas((datos) => [...datos, reservasDb]);
                if (reservas[0] !== undefined) {
                };
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const handleStatusCancelar = (status) => {
        let mostrarBtnCancelar = false;

        if (status === 'POR_CONFIRMAR' || status === 'CONFIRMADA') {
            mostrarBtnCancelar = true;
        }

        return mostrarBtnCancelar;
    }

    const handleStatusPagar = (status) => {
        let mostrarBtnPagar = false;

        if (status === 'POR_CONFIRMAR') {
            mostrarBtnPagar = true;
        }

        return mostrarBtnPagar;
    }

    const actualizarLista = (reservaActualizada) => {
        const nuevasReservas = reservas.map((reserva) => {
            if (reserva.id === reservaActualizada.id) {
                return reservaActualizada;
            }
            return reserva;
        });

        setReservas(nuevasReservas);
    };

    const handlePagar = (reserva) => {
        const fechaLlegada = new Date(reserva.fechaLlegada);
        let aPagar = reserva.total;

        if (Date.now() > fechaLlegada) {
            aPagar = reserva.total + (reserva.descuento * reserva.total / (100 - reserva.descuento))
        }

        reserva.status = StatusReserva.CONFIRMADA;
        reserva.statusPago = StatusPago.PAGADA;
        reserva.total = aPagar;

        actualizarLista(reserva);

    }






    return (
        <div className='container-dashboard row h-100'>
            <div className="table-responsive my-3">
                <table className="table table-hover table-blur">
                    <thead>
                        <tr>
                            <th scope="col">Estacionamiento</th>
                            <th scope="col">Vehiculo</th>
                            <th scope="col">Fecha Llegada</th>
                            <th scope="col">Fecha Salida</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservas.length ?
                                reservas.map((reserva) => {
                                    return (
                                        <tr key={reserva.id}>
                                            <th scope="row">{reserva.estacionamiento.nombreEstacionamiento}</th>
                                            <td>{reserva.vehiculo.modelo} - {reserva.vehiculo.patente}</td>
                                            <td>{reserva.fechaLlegada}</td>
                                            <td>{reserva.fechaSalida}</td>
                                            <td>{reserva.tipo}</td>
                                            <td>${reserva.total}</td>
                                            <td>{reserva.status.toLowerCase()}</td>
                                            <td>
                                                <div className="flex justify-content-around flex-wrap">
                                                    {
                                                        handleStatusPagar(reserva.status) ? (
                                                            <button className="btn btn-primary" title='Pagar reserva' onClick={() => handlePagar(reserva)}>
                                                                <i className="bi bi-credit-card"></i>
                                                            </button>
                                                        )
                                                            : null
                                                    }
                                                    {
                                                        handleStatusCancelar(reserva.status) ? (
                                                            <button className="btn btn-danger ml-5" title='Cancelar reserva'><i className="bi bi-trash"></i></button>
                                                        )
                                                            : null
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="8" className="text-center display-6">
                                        No tiene reservas registradas
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GestionReserva