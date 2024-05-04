import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from '../components/Header.jsx';


const Register = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pronouns, setPronouns] = useState('');
    const currentTimestamp = new Date().toISOString(); //get current timestamp
    const [acquisition, setAcquisition] = useState('');
    const navigate = useNavigate();

    //get name data from previous page
    // const location = useLocation();
    // const clientName = location.state?.clientName || 'Unknown';

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Customer Name:', FirstName);
        console.log('Email:', email);

        let newData = {
            firstName: FirstName,
            lastName: LastName,
            email: email,
            pronoun: pronouns,
            acquisition: acquisition,
            initialRegisted: currentTimestamp,
        };

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        };
        fetch("/api/v1/Customer", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("Update Succesful:", data);
                alert(FirstName + LastName + " has been regiisted!")
            })
            .catch((error) => console.error("Error:", error));
        navigate('/check-in');
    };

    return (
        <div className='page-container'>
            <Header pageNumber={2} />
            <div className="main-content">
                <h2>New Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input id="firstname" type="text" onChange={(e) => setFirstName(e.target.value)}></input>
                        <label>Last Name</label>
                        <input id="lastname" type="text" onChange={(e) => setLastName(e.target.value)}></input>
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
                        <label htmlFor="pronouns">Pronouns</label>
                        <select id="pronouns" value={pronouns} name="pronouns" required onChange={(e) => setPronouns(e.target.value)}>
                            <option value="" disabled hidden>Choose one</option>
                            <option value="she/her">She/Her</option>
                            <option value="he/him">He/Him</option>
                            <option value="they/them">They/Them</option>
                            <option value="ze/zir">Ze/Zir</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group" >
                        <label htmlFor="channel">How did you hear about us?</label>
                        <select id="channel" value={acquisition} name="channel" required onChange={(e) => setAcquisition(e.target.value)}>
                            <option value="" disabled hidden>Choose one</option>
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
                        <button type="submit">Sign Up</button>
                        {/* <button type="submit" onClick={backButton}>Back</button> */}
                        <button ><Link to="/check-in" className='white-text' >Back</Link></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;