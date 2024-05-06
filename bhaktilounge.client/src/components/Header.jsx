import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/BhaktiLounge-Logo.png';
import '../App.css';

const Header = () => {
    const navigate = useNavigate();

    const subscribe = () => {
        navigate('/subscribe/1/kenny/liu/a@b.com');
    }

    const register = () => {
        navigate('/register');
    }

    return (
        <header className="Header">
            <img src={logo} alt="BHAKTI Lounge Logo" className="Header-logo" />
            <span className='line-buttons'>
                <button className='button-class' onClick={subscribe}>Subscribe</button>
                <button className='button-class' onClick={register}>New Customer</button>
                <button className='button-class'>Log out</button>
            </span>

        </header>

    );
};

export default Header;