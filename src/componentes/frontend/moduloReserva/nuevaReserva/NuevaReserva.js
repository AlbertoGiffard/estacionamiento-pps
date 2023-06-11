import { useLocation, useNavigate } from 'react-router-dom';
import MenuLateral from '../../../utilitarios/menuLateral/MenuLateral';
import './NuevaReserva.css';
import { v4 as uuid } from 'uuid';
import React, { Fragment, useEffect, useState } from 'react';
import Reserva, { StatusPago, StatusReserva } from '../../../reserva/Reserva';
import Firebase from '../../../firebase/Firebase';
import { StatusPuesto } from '../../../puestoEstacionamiento/PuestoEstacionamiento';
import Vehiculo, { StatusVehiculo } from '../../../vehiculo/Vehiculo';

const NuevaReserva = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
    const [estacionamientoSeleccionado, setEstacionamientoSeleccionado] = useState(null);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [habilitado, setHabilitado] = useState(false);
    const [datos, setDatos] = useState({
        idReserva: uuid(),
        estacionamiento: "",
        usuario: "",
        vehiculo: "",
        tipo: "",
        fechaLlegada: "",
        fechaSalida: "",
        status: StatusReserva.POR_CONFIRMAR,
        statusPago: StatusPago.POR_PAGAR,
        datosTarjeta: {
            titular: "",
            numeroTarjeta: "",
            vencimientoTarjeta: "",
            codSeguridad: ""
        },
        descuento: "",
        total: "",
        subTotal: "",
    });
    const [vehiculos, setVehiculos] = useState([]);
    const [estacionamientos, setEstacionamientos] = useState([]);
    const [tipoReserva, setTipoReserva] = useState([]);
    const [puesto, setPuesto] = useState(null);

    useEffect(() => {
        const firebase = new Firebase();
        firebase.obtenerValorPorUnCampoEspecifico('vehiculos', 'usuario.email', userLocalStorage.email)
            .then((dataVehiculos) => {
                //setVehiculos((datos) => ({ ...datos, vehiculos: vehiculos }));
                if (dataVehiculos[0] === undefined) {
                    if (dataVehiculos.status === StatusVehiculo.ACTIVO) {
                        setVehiculoSeleccionado(dataVehiculos);
                        setVehiculos([dataVehiculos]);
                    }
                } else {
                    let vehiculosArray = [];
                    dataVehiculos.map((vehiculo) => {
                        if (vehiculo.status === StatusVehiculo.ACTIVO) {
                            vehiculosArray.push(vehiculo);
                        }
                    })
                    setVehiculoSeleccionado(dataVehiculos[0]);
                    setVehiculos(vehiculosArray);
                }
            })
            .catch((error) => {
                console.error(error);
            })

        firebase.obtenerValorEnDB('estacionamientos')
            .then((estacionamientos) => {
                setEstacionamientos(estacionamientos);
                setEstacionamientoSeleccionado(estacionamientos[0]);
            })
            .catch((error) => {
                console.error(error);
            });

        setDatos((prevDatos) => ({
            ...prevDatos,
            tipo: 'Dia',
            usuario: userLocalStorage.email,
            datosTarjeta: {
                titular: userLocalStorage.datosTarjeta.titular,
                numeroTarjeta: userLocalStorage.datosTarjeta.numeroTarjeta,
                vencimientoTarjeta: userLocalStorage.datosTarjeta?.vencimiento,
                codSeguridad: userLocalStorage.datosTarjeta.codSeguridad
            },
        }))
    }, [])

    useEffect(() => {
        setTipoReserva([]);

        if (estacionamientoSeleccionado && estacionamientoSeleccionado.tipoDia === 'on') {
            setTipoReserva((datos) => [...datos,
            {
                dia: true,
                monto: parseInt(estacionamientoSeleccionado.montoDia),
                descuento: estacionamientoSeleccionado.descuentoDia ? parseInt(estacionamientoSeleccionado.descuentoDia) : null
            }
            ]);
        } else {
            setTipoReserva((datos) => [...datos, { dia: false }]);
        }

        if (estacionamientoSeleccionado && estacionamientoSeleccionado.tipoHora === 'on') {
            setTipoReserva((datos) => [...datos,
            {
                hora: true,
                monto: parseInt(estacionamientoSeleccionado.montoHora),
                descuento: estacionamientoSeleccionado.descuentoHora ? parseInt(estacionamientoSeleccionado.descuentoHora) : null
            }
            ]);
        } else {
            setTipoReserva((datos) => [...datos, { hora: false }]);
        }

        if (estacionamientoSeleccionado && estacionamientoSeleccionado.tipoMes === 'on') {
            setTipoReserva((datos) => [...datos,
            {
                mes: true,
                monto: parseInt(estacionamientoSeleccionado.montoMes),
                descuento: estacionamientoSeleccionado.descuentoMes ? parseInt(estacionamientoSeleccionado.descuentoMes) : null
            }
            ]);
        } else {
            setTipoReserva((datos) => [...datos, { mes: false }]);
        }

    }, [estacionamientoSeleccionado])


    const handleChangeVehiculo = (event) => {
        const { name, value } = event.target;
        const valorSeleccionado = event.target.value;

        // Encuentra el objeto vehículo correspondiente al valor seleccionado
        const vehiculo = vehiculos.find((vehiculo) => vehiculo.modelo === valorSeleccionado);

        // Actualiza el estado vehiculoSeleccionado
        setVehiculoSeleccionado(vehiculo);
        let updatedDatos = {
            ...datos,
            [name]: value
        };
        setDatos(updatedDatos);
    };

    const handleChangeEstacionamiento = (event) => {
        const { name, value } = event.target;
        const valorSeleccionado = event.target.value;
        console.log('entre');

        // Encuentra el objeto vehículo correspondiente al valor seleccionado
        const estacionamiento = estacionamientos.find((estacionamiento) => estacionamiento.nombreEstacionamiento === valorSeleccionado);

        // Actualiza el estado vehiculoSeleccionado
        setEstacionamientoSeleccionado(estacionamiento);
        let updatedDatos = {
            ...datos,
            [name]: value
        };
        setDatos(updatedDatos);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Actualiza el estado de datos con el tipo seleccionado
        setDatos((prevDatos) => ({
            ...prevDatos,
            [name]: value
        }));
    };

    const handleTarjeta = () => {
        setDatos((prevDatos) => ({
            ...prevDatos,
            datosTarjeta: {
                titular: "Bruce Wayne",
                numeroTarjeta: "12345678910",
                vencimientoTarjeta: "2027-09-15",
                codSeguridad: "123",

            },
            fechaLlegada: "2023-05-20",
        }))
    }

    const tipoSeleccionadoInput = () => {
        let subtotal;
        let descuento;
        let descuentoPorcentaje;
        let total;

        switch (datos.tipo) {
            case 'Dia':
                subtotal = parseInt(estacionamientoSeleccionado.montoDia);
                descuento = estacionamientoSeleccionado.descuentoDia ? parseInt(estacionamientoSeleccionado.descuentoDia) : 0;
                break;

            case 'Hora':
                subtotal = parseInt(estacionamientoSeleccionado.montoHora);
                descuento = estacionamientoSeleccionado.descuentoHora ? parseInt(estacionamientoSeleccionado.descuentoHora) : 0;
                break;

            case 'Mes':
                subtotal = parseInt(estacionamientoSeleccionado.montoMes);
                descuento = estacionamientoSeleccionado.descuentoMes ? parseInt(estacionamientoSeleccionado.descuentoMes) : 0;
                break;

            default:
                break;
        }

        descuentoPorcentaje = descuento * subtotal / 100;
        total = subtotal - descuentoPorcentaje;

        setDatos((prevDatos) => ({
            ...prevDatos,
            total: total,
            subTotal: subtotal,
            descuento: descuento,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (vehiculoSeleccionado === null) {
            alert('Tiene que tener al menos un auto activo');
            navigate('/dashboard/vehiculos/nuevoVehiculo');
            return;
        }

        setDatos((prevDatos) => ({
            ...prevDatos,
            vehiculo: vehiculoSeleccionado,
            estacionamiento: estacionamientoSeleccionado,
        }))

        getPuestoEstacionamiento(estacionamientoSeleccionado.idEstacionamiento, vehiculoSeleccionado.tipo.toLowerCase()).then((puestoEstacionamiento) => {
            if (puestoEstacionamiento !== null) {
                setPuesto(puestoEstacionamiento);
                tipoSeleccionadoInput();
                setHabilitado(true);
            } else {
                alert("Sin puestos disponibles");
            }


        })

    };

    const handleReserva = () => {
        const nuevoPuesto = puesto;
        const firebase = new Firebase();

        nuevoPuesto.status = StatusPuesto.OCUPADO;
        nuevoPuesto.vehiculo = vehiculoSeleccionado;
        firebase.actualizarEnDB(nuevoPuesto.id, 'puestosEstacionamientos', nuevoPuesto)
            .then(() => {
                const nuevaReserva = {
                    idReserva: uuid(),
                    estacionamiento: estacionamientoSeleccionado,
                    usuario: userLocalStorage.email,
                    vehiculo: vehiculoSeleccionado,
                    tipo: datos.tipo,
                    fechaLlegada: datos.fechaLlegada,
                    fechaSalida: datos.fechaSalida,
                    status: StatusReserva.POR_CONFIRMAR,
                    statusPago: StatusPago.POR_PAGAR,
                    descuento: datos.descuento,
                    total: datos.total
                };

                console.log(nuevaReserva);

                vehiculoSeleccionado.totalReservas = vehiculoSeleccionado.totalReservas + 1;
                
                Vehiculo.actualizar(vehiculoSeleccionado)
                .then(() => {
                    const reservaComponent = new Reserva(nuevaReserva);
    
                    reservaComponent.registrar()
                        .then(() => {
                            alert('Reserva creada exitosamente');
                            navigate('/dashboard');
                        })
                        .catch((error) => {
                            console.error("reserva", error);
                        })
                })

            })
            .catch((error) => {
                console.error("puesto", error);
            })
    }

    const getPuestoEstacionamiento = (id, tipoVehiculo) => {
        const firebase = new Firebase();
        let puestoEstacionamiento = null;


        return firebase.obtenerPuestosEstacionamientoPorEstacionamiento(id)
            .then((puestos) => {
                puestos.map((puesto) => {
                    if (puesto.status === 'LIBRE') {
                        puesto.tipoVehiculos.map((tipo) => {
                            if (tipo === tipoVehiculo) {
                                puestoEstacionamiento = puesto;
                            }
                        })
                    }
                })
                return puestoEstacionamiento;
            })
            .finally(() => {
                return puestoEstacionamiento;
            })

    }

    return (
        <div className='container-dashboard row h-100'>
            <div className="col-md-2 bg-list">
                <MenuLateral />
            </div>
            <div className="container col-md-9">
                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <span className="display-6">
                                Vehiculo
                            </span>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Modelo</span>
                                    <select className="form-select" onChange={handleChangeVehiculo} value={vehiculoSeleccionado?.modelo} name='modelo'>
                                        {vehiculos.map((vehiculo) => {
                                            return (
                                                <option value={vehiculo.modelo} key={vehiculo.idVehiculo}>{vehiculo.modelo}</option>

                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Marca</span>
                                    <select className="form-select" onChange={handleChangeVehiculo} value={vehiculoSeleccionado?.marca} name='marca'>
                                        {vehiculos.map((vehiculo) => {
                                            return (
                                                <option value={vehiculo.marca} key={uuid()}>{vehiculo.marca}</option>

                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Patente</span>
                                    <select className="form-select" onChange={handleChangeVehiculo} value={vehiculoSeleccionado?.patente} name='patente'>
                                        {vehiculos.map((vehiculo) => {
                                            return (
                                                <option value={vehiculo.patente} key={uuid()}>{vehiculo.patente}</option>

                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Tipo</span>
                                    <select className="form-select" onChange={handleChangeVehiculo} value={vehiculoSeleccionado?.tipo} name='tipo'>
                                        {vehiculos.map((vehiculo) => {
                                            return (
                                                <option value={vehiculo.tipo} key={uuid()}>{vehiculo.tipo}</option>

                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3">
                            <span className="display-6">
                                Estacionamiento
                            </span>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Nombre Estacionamiento</span>
                                    <select className="form-select" onChange={handleChangeEstacionamiento} value={estacionamientoSeleccionado?.nombreEstacionamiento} name='nombreEstacionamiento'>
                                        {estacionamientos.map((estacionamiento) => {
                                            return (
                                                <option value={estacionamiento.nombreEstacionamiento} key={uuid()}>{estacionamiento.nombreEstacionamiento}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="box">
                                    <span>Dirección</span>
                                    <select className="form-select" onChange={handleChangeEstacionamiento} value={estacionamientoSeleccionado?.direccionEstacionamiento} name='direccionEstacionamiento'>
                                        {estacionamientos.map((estacionamiento) => {
                                            return (
                                                <option value={estacionamiento.direccionEstacionamiento} key={uuid()}>{estacionamiento.direccionEstacionamiento}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3">
                            <span className="display-6">
                                Reserva
                            </span>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box">
                                    <span>Tipo</span>
                                    <select className="form-select" onChange={handleChange} name='tipo'>
                                        {tipoReserva.map((opcion) => {
                                            if (opcion.dia && opcion.hora && opcion.mes) {
                                                return (
                                                    <Fragment key="todos">
                                                        <option value="Dia">Dia</option>
                                                        <option value="Hora">Hora</option>
                                                        <option value="Mes">Mes</option>
                                                    </Fragment>
                                                );
                                            } else {
                                                return (
                                                    <Fragment key={Object.keys(opcion)[0]}>
                                                        {opcion.dia && (
                                                            <option value="Dia">Dia</option>
                                                        )}
                                                        {opcion.hora && (
                                                            <option value="Hora">Hora</option>
                                                        )}
                                                        {opcion.mes && (
                                                            <option value="Mes">Mes</option>
                                                        )}
                                                    </Fragment>
                                                );
                                            }
                                        })}
                                    </select>
                                </div>
                                <div className="box d-flex flex-column justify-content-around">
                                    <span>Fecha Llegada</span>
                                    <input type="date" id='dateLlegada' onChange={handleChange} value={datos.fechaLlegada} name='fechaLlegada' />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3">
                            <div className="d-flex flex-row mb-4">
                                <span className="display-6 mr-3">
                                    Metodo de Pago
                                </span>
                                <button className='btn btn-secondary ml-3' onClick={handleTarjeta} type='button'>Tarjeta</button>
                            </div>
                            <div className="d-flex flex-row justify-content-around">
                                <div className="box d-flex flex-column justify-content-around">
                                    <span>Titular</span>
                                    <input type="text" onChange={handleChange} value={datos.datosTarjeta?.titular} name='datosTarjeta.titular' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around">
                                    <span>Número</span>
                                    <input type="text" onChange={handleChange} value={datos.datosTarjeta?.numeroTarjeta} name='datosTarjeta.numeroTarjeta' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around">
                                    <span>Vencimiento</span>
                                    <input type="Date" id='datosTarjeta.vencimientoTarjeta' onChange={handleChange} value={datos.datosTarjeta?.vencimientoTarjeta} name='datosTarjeta.vencimientoTarjeta' />
                                </div>
                                <div className="box d-flex flex-column justify-content-around">
                                    <span>Cod. Seguridad</span>
                                    <input type="text" onChange={handleChange} name='datosTarjeta.codSeguridad' value={datos.datosTarjeta?.codSeguridad} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-12 mb-3 row">
                            <div className="col-md-6">
                                <span className="display-6">
                                    Sub-Total: ${datos.subTotal}
                                    <br />
                                    Descuento: {datos.descuento}%
                                    <br />
                                    Total: ${datos.total}
                                </span>
                            </div>
                            <div className="col-md-6 d-flex justify-content-around align-items-end">
                                <button className="btn btn-primary btn-lg btn-block btn-reserva" onClick={handleSubmit} type='button'>Calcular</button>
                                <button className="btn btn-success btn-lg btn-block btn-reserva" disabled={!habilitado} onClick={handleReserva} type='button'>Reservar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NuevaReserva;