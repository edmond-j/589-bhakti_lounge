import React, { useState } from 'react';
import './NewCheckIn.css';
import { useLocation } from 'react-router-dom';

const NewCheckIn = () => {
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const imageUrl = '/assets/logo.jpg'

    //get name data from previous page
    const location = useLocation();
    const clientName = location.state?.clientName || 'Unknown';


    const handleSubmit = (event) => {
        event.preventDefault();
        // Process check-in data, like sending to an API
        console.log('Customer Name:', customerName);
        console.log('Email:', email);
        // Reset form or give feedback to the user
    };

    return (
        <div>
            <img src={imageUrl} alt="Description" />
            <header className="header">
                <h1>BHAKTI Lounge</h1>
                <button onClick={() => console.log('Log out')}>Log out</button>
            </header>
            <div className="main-content">
                <h2>New Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <div className="info-value">Johnny</div>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter an email address'
                        />
                    </div>
                    <div className="form-group" >
                        <label for="pronouns">Pronouns:</label>
                        <select id="pronouns" name="pronouns" required>
                            <option value="" selected disabled hidden>Choose one</option>
                            <option value="she/her">She/Her</option>
                            <option value="he/him">He/Him</option>
                            <option value="they/them">They/Them</option>
                            <option value="ze/zir">Ze/Zir</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button className="submit-button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default NewCheckIn;
