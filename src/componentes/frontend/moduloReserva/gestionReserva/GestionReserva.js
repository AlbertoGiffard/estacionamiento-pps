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

        if (status === StatusReserva.POR_CONFIRMAR) {
            mostrarBtnCancelar = true;
        }

        return mostrarBtnCancelar;
    }

    const handleStatusPagar = (status) => {
        let mostrarBtnPagar = false;

        if (status === StatusPago.POR_PAGAR) {
            mostrarBtnPagar = true;
        }

        return mostrarBtnPagar;
    }

    const handleStatusConfirmar = (status) => {
        let mostrarBtnConfirmar = false;

        if (status === StatusReserva.POR_CONFIRMAR) {
            mostrarBtnConfirmar = true;
        }

        return mostrarBtnConfirmar;
    }

    const handleStatusFinalizar = (statusReserva, statusPago) => {
        let mostrarBtnFinalizar = false;

        if (statusReserva === StatusReserva.CONFIRMADA && statusPago === StatusPago.PAGADA) {
            mostrarBtnFinalizar = true;
        }

        return mostrarBtnFinalizar;
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

    const handleSubmit = (reserva, statusPuesto, vehiculo = null) => {
        Reserva.actualizar(reserva)
        .then(() => {
            actualizarPuesto(reserva, statusPuesto, vehiculo)
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
        handleSubmit(reserva, false, reserva.vehiculo);
    }

    const handleConfirmar = (reserva) => {
        reserva.status = StatusReserva.CONFIRMADA;

        actualizarLista(reserva);
        handleSubmit(reserva, StatusPuesto.OCUPADO, reserva.vehiculo);
    }

    const handleFinalizada = (reserva) => {
        reserva.status = StatusReserva.FINALIZADA;

        actualizarLista(reserva);
        handleSubmit(reserva, StatusPuesto.LIBRE);
    }

    const actualizarPuesto = (reserva, statusPuesto, vehiculo = null) => {
        const firebase = new Firebase();

        return firebase.obtenerValorPorUnCampoEspecifico('puestosEstacionamientos', 'vehiculo.idVehiculo', reserva.vehiculo.idVehiculo)
        .then((puesto) => {
            puesto.vehiculo = vehiculo;
            if (statusPuesto !== false) {
                puesto.status = statusPuesto;                
            }

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
        handleSubmit(reserva, StatusPuesto.LIBRE);
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
                                                        handleStatusConfirmar(reserva.status) ? (
                                                            <button className="btn btn-success" title='Confirmar reserva' onClick={() => handleConfirmar(reserva)}>
                                                                <i className="bi bi-check-circle"></i>
                                                            </button>
                                                        )
                                                            : null
                                                    }
                                                    {
                                                        handleStatusPagar(reserva.statusPago) ? (
                                                            <button className="btn btn-primary ml-5" title='Pagar reserva' onClick={() => handlePagar(reserva)}>
                                                                <i className="bi bi-credit-card"></i>
                                                            </button>
                                                        )
                                                            : null
                                                    }
                                                    {
                                                        handleStatusFinalizar(reserva.status, reserva.statusPago) ? (
                                                            <button className="btn btn-success ml-5" title='Finalizar reserva' onClick={() => handleFinalizada(reserva)}>
                                                                <i className="bi bi-car-front"></i>
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