import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.jpg";
import {useSelector} from "react-redux";

const Header = () => {

    const userRole = useSelector((state) => state.userRole);

    const navigate = useNavigate();

    const register = () => {
        navigate("/check/register");
    };
    const goManagement = () => {
        navigate("/management/activity");
    };
    const goHome = () => {
        navigate("/");
    };
    return (
        <header className="Header">
            <img src={logo} alt="BHAKTI Lounge Logo" height="80" className="Header-logo" />
            <div className="button-container">
                {userRole.value === "Manager" && (
                    <button className="tw-btn" onClick={goManagement}>
                        Manage
                    </button>
                )}
                <button className="tw-btn" onClick={register}>
                    New Customer
                </button>
                <button className="tw-btn" onClick={goHome}>Log out</button>
            </div>
        </header>
    );
};

export default Header;
