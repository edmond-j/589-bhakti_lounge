import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from '../components/Header.jsx';

const Register = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const currentTimestamp = new Date().toISOString(); //get current timestamp
    const [acquisition, setAcquisition] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        let newData = {
            firstName: FirstName,
            lastName: LastName,
            email: email,
            gender: gender,
            acquisition: acquisition,
            initialRegisted: currentTimestamp,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        };

        console.log(requestOptions);
        fetch("/api/v1/Customer", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("Update Successful:", data);
                alert(FirstName + LastName + " has been registered!")
            })
            .catch((error) => console.error("Error:", error));
        const customerName = FirstName + " " + LastName;
        navigate('check/check-in', { state: { FirstName } });
    };

    return (
        <div className='page-container'>
            <Header pageNumber={2} />
            <div className="main-content">
                <h2>New Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input id="firstname" type="text" required onChange={(e) => setFirstName(e.target.value)}></input>
                        <label>Last Name</label>
                        <input id="lastname" type="text" required onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter an email address'
                            required
                        />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="pronouns">Pronouns</label>
                        <select id="pronouns" value={gender} name="pronouns" required
                            onChange={(e) => setGender(e.target.value)}>
                            <option value="" disabled hidden>Choose one</option>
                            <option value="he">He/Him</option>
                            <option value="she">She/Her</option>
                            <option value="they">They/Them</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group" >
                        <label htmlFor="channel">How did you hear about us?</label>
                        <select id="channel" value={acquisition} name="channel" required
                            onChange={(e) => setAcquisition(e.target.value)}>
                            <option value="" disabled hidden>Choose one</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="WordOfMouth">Word of Mouth</option>
                            <option value="Flyer">Flyer</option>
                            <option value="Poster">Poster</option>
                            <option value="GoogleSearch">Google Search</option>
                            <option value="Eventbrite">Eventbrite</option>
                            <option value="EventFinder">EventFinder</option>
                            <option value="Humanitix">Humanitix</option>
                            <option value="BhaktiLoungeWebsite">Bhakti Lounge Website</option>
                            <option value="SelfDiscover">Self Discovery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='button-container'>
                        <button className="tw-btn" type="submit">Sign Up</button>
                        {/* <button type="submit" onClick={backButton}>Back</button> */}
                        <Link to="/check/check-in" >
                        <button className="tw-btn">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;