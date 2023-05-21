import './Cards.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Cards = (props) => {
    const { titulo, mensaje, link, user } = props;
    return (
        <div className="card size-card blur-bg">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{titulo}</h5>
                <p className="card-text">{mensaje}.</p>
                <div className='mt-auto'>
                    <Link to={{ pathname: link, state: { userData: user } }} className="nav-link active">
                        <div className='btn btn-primary ml-3'>Entrar</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cards;