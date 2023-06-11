import React, { Fragment, useEffect, useState } from 'react'
import './ListaEstacionamiento.css'

const ListaEstacionamiento = ({ estacionamientos, obtenerTipos, estacionamientoSeleccionado }) => {
    return (
        estacionamientos.length ? (
            estacionamientos.map((estacionamiento) => (
                <div key={estacionamiento.idEstacionamiento} className='hover' onClick={() => estacionamientoSeleccionado(estacionamiento)}>
                    <div className="d-flex w-100 justify-content-center">
                        <h5 className="mb-1">{estacionamiento.nombreEstacionamiento.toUpperCase()}</h5>
                    </div>
                    <p className="mb-1">Dirección: {estacionamiento.direccionEstacionamiento}</p>
                    <small className="margin-left-sm">Disponibilidad actual: {estacionamiento.disponibilidad}</small>
                    <br />
                    <small>{`Habilitado: ${obtenerTipos(estacionamiento)}`}</small>
                    <hr />
                </div>
            ))
        ) : (
            <div>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">No hay estacionamientos disponibles</h5>
                </div>
            </div>
        )
    );
}

export default ListaEstacionamiento