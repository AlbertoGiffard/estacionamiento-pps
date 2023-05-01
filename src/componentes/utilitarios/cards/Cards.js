import './Cards.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Cards = (props) => {
    const { titulo, mensaje, link } = props;

    return (
        <div className="card size-card blur-bg">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{titulo}</h5>
                <p className="card-text">{mensaje}.</p>
                <div className='mt-auto'>
                    <Link to={`${link}`} className="nav-link active">
                        <a className='btn btn-primary ml-3'>Entrar</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cards;