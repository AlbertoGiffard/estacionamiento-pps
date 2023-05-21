import './Header.css';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Firebase from '../firebase/Firebase';

const Header = () => {
    const firebase = new Firebase();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = firebase.state.auth.onAuthStateChanged((user) => {
            setUser(user);
            console.log('header',user);
        });

        // Clean up the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [firebase.state.auth]);

    const signOut = () => {
        firebase.cerrarSesion().then(() => {
            localStorage.removeItem('userData');
            navigate('/');
        })
    }

    return (
        <Fragment>
            <nav className="navbar bg-body-tertiary bg-inicio">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex align-text-center align-items-center">
                        <img src="http://www.logobook.com/wp-content/uploads/2016/10/Messaggeria_Emiliana_logo.svg" alt="Logo" className="d-inline-block align-text-center img" />
                        <Link to="/" className="nav-link active">
                            <span className='ml-3 text-center'>
                                Park Me Now
                            </span>

                        </Link>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    {!user && (
                                        <li className="nav-item">
                                            <Link to="login" className="nav-link active" aria-current="page">Iniciar Sesión</Link>
                                        </li>
                                    )}
                                    {user && (
                                        <>
                                            <li className="nav-item">
                                                <Link to="/dashboard" className="nav-link active">Hola, {user.email}</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" className="nav-link active" onClick={signOut}>Cerrar Sesión</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header;