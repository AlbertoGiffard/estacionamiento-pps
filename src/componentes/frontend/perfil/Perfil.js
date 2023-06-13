import React, { useEffect, useState } from 'react'
import './Perfil.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Usuario, { StatusUsuario } from '../../usuario/Usuario';
import Firebase from '../../firebase/Firebase';

const imageDefault = 'data:image/jpeg;base64,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';

const Perfil = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
    const [datos, setDatos] = useState({
        idUsuario: userLocalStorage.idUsuario,
        nombre: userLocalStorage.nombre,
        apellido: userLocalStorage.apellido,
        dni: userLocalStorage.dni,
        email: userLocalStorage.email,
        telefono: userLocalStorage.telefono,
        contrasenia: userLocalStorage.contrasenia,
        validarContrasenia: userLocalStorage.contrasenia,
        direccion: userLocalStorage.direccion,
        datosTarjeta: userLocalStorage.datosTarjeta || null,
        rol: userLocalStorage.rol,
        fechaAlta: userLocalStorage.fechaAlta,
        status: userLocalStorage.status,
        foto: userLocalStorage.foto || null
    });

    const fechaAltaValida = new Date(userLocalStorage.fechaAlta.seconds * 1000 + userLocalStorage.fechaAlta.nanoseconds / 1000000);
    const formatNumber = (number) => {
        return number < 10 ? `0${number}` : number;
    };
    const formattedFechaAlta = `${formatNumber(fechaAltaValida.getDate())}-${formatNumber(fechaAltaValida.getMonth() + 1)}-${fechaAltaValida.getFullYear()}`;

    const isNotActivo = () => {
        let result = true;

        if (datos.status === StatusUsuario.ACTIVO) {
            result = false;
        }

        return result;
    }

    useEffect(() => {
      const firebase = new Firebase();

      firebase.obtenerValorPorUnCampoEspecifico('usuarios', 'idUsuario', userLocalStorage.idUsuario)
      .then((usuario) => {
          if (usuario !== null) {
              setDatos(usuario);
              localStorage.setItem('userData', JSON.stringify(usuario));
          }
      })
      .catch((error) => {
          console.error(error);
      })
    }, [])
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Si el campo pertenece a datosTarjeta, se actualiza ese objeto en el estado
        if (name.startsWith("datosTarjeta")) {
            const tarjetaFieldName = name.split(".")[1];
            setDatos((prevDatos) => ({
                ...prevDatos,
                datosTarjeta: {
                    ...prevDatos.datosTarjeta,
                    [tarjetaFieldName]: value,
                },
            }));
        } else {
            // Si el campo no pertenece a datosTarjeta, se actualiza directamente en el estado
            setDatos((prevDatos) => ({
                ...prevDatos,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            return Usuario.actualizar(datos)
                .then(() => {
                    alert('Cambios realizados correctamente');
                    console.log('exitazo');

                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error(errorMessage);
                    alert(`Error: Verifique los campos`);
                    window.location.reload();
                    throw error;
                })
        } catch (error) {
            alert('Error: Verifique los campos');
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const firebase = new Firebase();
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageSrc = event.target.result;
            if (imageSrc) {
                setDatos((prevDatos) => {
                    return { ...prevDatos, foto: imageSrc };
                });
            }
        };

        if (file) {
            reader.readAsDataURL(file);
            firebase.uploadImage(file)
                .then((downloadURL) => {
                    setDatos((prevDatos) => ({ ...prevDatos, foto: downloadURL }));
                    console.log(datos);
                })
                .catch((error) => {
                    console.error('Error al subir la imagen:', error);
                });
        }
    };

    return (
        <div className='container-dashboard h-100'>
            <div className="text-center mr-2">
                <span className="display-6 fw-bold mr-20">
                    Mi Perfil
                </span>
                <br />

                <label htmlFor="fileInput" className="custom-file-upload">
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileInputChange}
                        className="d-none"
                        accept=".png, .jpg, .jpeg"
                    />
                    <img
                        src={datos.foto || imageDefault}
                        className="rounded mx-auto d-block img-size"
                        alt="perfil"
                    />
                </label>

            </div>
            <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="nombre" className="fs-4">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={datos.nombre} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="apellido" className="fs-4">Apellido</label>
                        <input type="text" className="form-control" id="apellido" name="apellido" value={datos.apellido} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="dniCliente" className="fs-4">DNI</label>
                        <input type="number" className="form-control" id="dniCliente" name="dni" disabled value={datos.dni} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="fechaAlta" className="fs-4">Fecha de Alta</label>
                        <input type="text" className="form-control" id="fechaAlta" name="fechaAlta" value={formattedFechaAlta} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="rol" className="fs-4">Rol</label>
                        <input type="text" className="form-control" id="rol" name="rol" value={datos.rol.toLowerCase()} disabled />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="status" className="fs-4">Status</label>
                        <select
                            className="form-select w-100"
                            onChange={handleChange}
                            name='status'
                            disabled={isNotActivo()}
                            value={datos.status}>
                            <option value="ACTIVO">Activo</option>
                            <option value="INACTIVO">Inactivo</option>
                            <option value="LISTA_NEGRA" disabled>Lista Negra</option>
                            <option value="SIN_SUSCRIPCION" disabled>Sin Suscripcion</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="email" className="fs-4">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="correo@mail.com" value={datos.email} required onChange={handleChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="telefono" className="fs-4">Teléfono</label>
                        <input type="number" max={1199999999} min={1100000001} className="form-control" id="telefono" name="telefono" placeholder="1188994455" required onChange={handleChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="direccion" className="fs-4">Dirección</label>
                        <input type="text" className="form-control" id="direccion" name="direccion" placeholder="Gotham 123" value={datos.direccion} required onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="datosTarjeta.titular" className="fs-4">Titular</label>
                        <input type="text" className="form-control" id="datosTarjeta.titular" name="datosTarjeta.titular" placeholder="Junior" value={datos.datosTarjeta?.titular} onChange={handleChange} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="datosTarjeta.numeroTarjeta" className="fs-4">Número</label>
                        <input type="number" className="form-control" id="datosTarjeta.numeroTarjeta" name="datosTarjeta.numeroTarjeta" placeholder="123456789" value={datos.datosTarjeta?.numero} onChange={handleChange} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="datosTarjeta.vencimiento" className="fs-4">Vencimiento</label>
                        <input type="date" className="form-control" id="vencimiento" name="datosTarjeta.vencimiento" value={datos.datosTarjeta?.vencimiento} onChange={handleChange} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="datosTarjeta.codSeguridad" className="fs-4">Código de seguridad</label>
                        <input type="number" className="form-control" id="datosTarjeta.codSeguridad" name="datosTarjeta.codSeguridad" placeholder='123' value={datos.datosTarjeta?.codSeguridad} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="contrasenia" className="fs-4">Contraseña</label>
                        <input type="password" className="form-control" id="contrasenia" name="contrasenia" value={datos.contrasenia} required onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validarContrasenia" className="fs-4">Repetir Contraseña</label>
                        <input type="password" className="form-control" id="validarContrasenia" name="validarContrasenia" value={datos.validarContrasenia} required onChange={handleChange} />
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary btn-lg w-50" type="button" onClick={handleSubmit}>
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Perfil