import React, { useEffect, useState } from 'react'
import './GestionReserva.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Firebase from '../../../firebase/Firebase';
import Reserva, { StatusPago, StatusReserva } from '../../../reserva/Reserva';
import PuestoEstacionamiento, { StatusPuesto } from '../../../puestoEstacionamiento/PuestoEstacionamiento';

const GestionReserva = () => {
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const firebase = new Firebase();
        firebase.obtenerValorPorUnCampoEspecifico('reservas', 'usuario', userLocalStorage.email)
            .then((reservasDb) => {
                setReservas(reservasDb);
                if (reservas[0] !== undefined) {
                };
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const handleStatusCancelar = (status) => {
        let mostrarBtnCancelar = false;

        if (status === 'POR_CONFIRMAR') {
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

    const handleSubmit = (reserva) => {
        Reserva.actualizar(reserva)
        .then(() => {
            actualizarPuesto(reserva)
            .then(() => {
                alert('Modificada la reserva correctamente');
                console.log('exitazo');
            })
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error(errorMessage);
            alert(`Error: Intente nuevamente`);
            window.location.reload();
            throw error;
        })
    }

    const handlePagar = (reserva) => {
        const fechaLlegada = new Date(reserva.fechaLlegada);
        let aPagar = reserva.total;

        if (reserva.tipo === "Hora" && Date.now() > fechaLlegada) {
            // Si es tipo "Hora" y se ha pasado de una hora, sumar el descuento al total
            const horasTranscurridas = Math.ceil((Date.now() - fechaLlegada) / (1000 * 60 * 60));
            if (horasTranscurridas > 1) {
                aPagar = reserva.total + (reserva.descuento * reserva.total / 100);
            }
        } else if (reserva.tipo === "Dia" && Date.now() > fechaLlegada) {
            // Si es tipo "Día" y se ha pasado del día, sumar el descuento al total
            aPagar = reserva.total + (reserva.descuento * reserva.total / 100);
        } else if (reserva.tipo === "Mes") {
            // Obtener el mes actual
            const mesActual = new Date().getMonth() + 1;
            // Obtener el mes de la fecha de llegada
            const mesLlegada = fechaLlegada.getMonth() + 1;
            if (mesLlegada < mesActual) {
                // Si el mes de llegada es anterior al mes actual, sumar el descuento al total
                aPagar = reserva.total + (reserva.descuento * reserva.total / 100);
            }
        }

        reserva.status = StatusReserva.CONFIRMADA;
        reserva.statusPago = StatusPago.PAGADA;
        reserva.total = aPagar;



        actualizarLista(reserva);
        handleSubmit(reserva);
    }

    const actualizarPuesto = (reserva) => {
        const firebase = new Firebase();

        return firebase.obtenerValorPorUnCampoEspecifico('puestosEstacionamientos', 'vehiculo.idVehiculo', reserva.vehiculo.idVehiculo)
        .then((puesto) => {
            puesto.vehiculo = null;
            puesto.status = StatusPuesto.LIBRE;

            PuestoEstacionamiento.actualizar(puesto)
            .then(() => {
                return true;
            })
        })
    }

    const handleCancelar = (reserva) => {
        reserva.status = StatusReserva.CANCELADA;
        reserva.statusPago = StatusPago.CANCELADA;
        reserva.total = reserva.total + (reserva.descuento * reserva.total / 100);;

        actualizarLista(reserva);
        handleSubmit(reserva);
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
                            <th scope="col">Tipo</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservas?.length ?
                                reservas.map((reserva) => {
                                    return (
                                        <tr key={reserva.id}>
                                            <th scope="row">{reserva.estacionamiento.nombreEstacionamiento}</th>
                                            <td>{reserva.vehiculo.modelo} - {reserva.vehiculo.patente}</td>
                                            <td>{reserva.fechaLlegada}</td>
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
                                                            <button className="btn btn-danger ml-5" title='Cancelar reserva' onClick={() => handleCancelar(reserva)}>
                                                                <i className="bi bi-trash"></i>
                                                            </button>
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
                                    <td colSpan="7" className="text-center display-6">
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