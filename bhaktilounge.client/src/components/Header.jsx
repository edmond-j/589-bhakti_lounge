import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/BhaktiLounge-Logo.png";

const Header = () => {
    const navigate = useNavigate();

    const register = () => {
        navigate("/register");
    };
    const goManagement = () => {
        navigate("/management/activity");
    };

    return (
        <header className="Header">
            <img src={logo} alt="BHAKTI Lounge Logo" className="Header-logo" />
            <span className="line-buttons">
                <button className="button-class" onClick={goManagement}>
                    Manage
                </button>
                <button className="button-class" onClick={register}>
                    New Customer
                </button>
                <button className="button-class">Log out</button>
            </span>
        </header>
    );
};

export default Header;
