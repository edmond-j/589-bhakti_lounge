import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/BhaktiLounge-Logo.png";

const Header = () => {
    const navigate = useNavigate();

    const register = () => {
        navigate("/check/register");
    };
    const goManagement = () => {
        navigate("/management/activity");
    };

    return (
        <header className="Header">
            <img src={logo} alt="BHAKTI Lounge Logo" height="80" className="Header-logo" />
            <div className="button-container">
                <button className="tw-btn" onClick={goManagement}>
                    Manage
                </button>
                <button className="tw-btn" onClick={register}>
                    New Customer
                </button>
                <button className="tw-btn">Log out</button>
            </div>
        </header>
    );
};

export default Header;
