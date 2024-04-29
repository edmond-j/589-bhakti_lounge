import React, { useState } from 'react';
import './NewCheckIn.css';
import { useLocation } from 'react-router-dom';

const NewCheckIn = () => {
    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    // const imageUrl = './assets/logo.jpg'

    //get name data from previous page
    const location = useLocation();
    const clientName = location.state?.clientName || 'Unknown';


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Customer Name:', customerName);
        console.log('Email:', email);

        let newData = {
            name: customerName,
            price: email,
            date: date,
            startTime: startTime,
            endTime: endTime,
          };
    
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
          };
          fetch("/api/v1/event", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log("Update Succesful:", data);
              alert(data.name+" has been updated!")
              const updatedItems = events.map((item) =>
                item.id === data.id ? data : item
              );
              setEvent(updatedItems);
              setSelectedItem(data);
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className='page-container'>
            <header className="header">
                <h1>BHAKTI Lounge</h1>
                <button onClick={() => console.log('Log out')}>Log out</button>
            </header>
            <div className="main-content">
                <h2>New Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <div className="info-value">{clientName}</div>
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

                    <div className="form-group" >
                        <label for="channel">How did you hear about us?</label>
                        <select id="channel" name="channel" required>
                            <option value="" selected disabled hidden>Choose one</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Flyer">Flyer</option>
                            <option value="Bhakti_Website">Bhakti Website</option>
                            <option value="friend_family">Friend/Family Referral</option>
                            <option value="Google_Search">Google Search</option>
                            <option value="other">Other11</option>
                        </select>
                    </div>
                    <div className='button-container'>
                        <button  type="submit">Sign Up</button>
                        <button  type="submit">Back</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCheckIn;
