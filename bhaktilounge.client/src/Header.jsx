import React from 'react';
import logo from './assets/BhaktiLounge-Logo.png'; // 假设你有一个logo图像
import './App.css'; // Header组件的样式文件

const Header = ({ pageNumber }) => {
    return (
        <header className="Header">
            <img src={logo} alt="BHAKTI Lounge Logo" className="Header-logo" />
            {pageNumber === 1 && (
                <span className='line-buttons'>
                    <button className='button-class'>Subscribe</button>
                    <button className='button-class'>New Customer</button>
                    <button className='button-class'>Log out</button>
                </span>
            )}
            {pageNumber === 2 && (
                <span className='line-buttons'>
                    <button className='button-class'>Subscribe</button>
                    <button className='button-class'>Log out</button>
                </span>
            )}
            {pageNumber === 3 && (
                <span className='line-buttons'>
                    <button className='button-class'>Log out</button>
                </span>
            )}

        </header>

    );
};

export default Header;
