import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import authFetch from "@/utils/authFetch.js";
import { useEffect } from "react";

const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const currentTimestamp = new Date().toISOString(); //get current timestamp
  const [acquisition, setAcquisition] = useState("");
  const [notification, setNotification] = useState();
  const navigate = useNavigate();
  const [channel, setChannel] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authFetch("/api/v1/Acquisition", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setChannel(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newData = {
      firstName: FirstName,
      lastName: LastName,
      email: email,
      gender: gender,
      acquisition: acquisition,
      initialRegistered: currentTimestamp,
      notification: notification,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };

    console.log(requestOptions);
    authFetch("/api/v1/Customer", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Successful:", data);
        alert(FirstName +" "+ LastName + " has been registered!");
        navigate(`/check/check-in`,{ state: { firstTime: true, customer: data } });
      })
      .catch((error) => console.error("Error:", error));
    // const customerName = FirstName + " " + LastName;

  };

  return (
    <div className="page-container">
      <Header pageNumber={2} />
      <div className="main-content">
        <h2>New Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-firstname-input">First Name</label>
            <input
              id="register-firstname-input"
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label htmlFor="register-lastname-input">Last Name</label>
            <input
              id="register-lastname-input"
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="register-email-input">Email</label>
            <input
              id="register-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter an email address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-pronouns-select">Pronouns</label>
            <select
              id="register-pronouns-select"
              value={gender}
              name="pronouns"
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled hidden>
                Choose one
              </option>
              <option value="he">He/Him</option>
              <option value="she">She/Her</option>
              <option value="they">They/Them</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='register-channel-select'>How did you hear about us?</label>
            <select
              id='register-channel-select'
              value={acquisition}
              name='channel'
              required
              onChange={(e) => setAcquisition(e.target.value)}
            >
              <option value='' disabled hidden>
                Choose one
              </option>
              {channel.map((p) => {
                return (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='register-notification-checkbox'>Would you like to be added to our email list?</label>
            <input
              id='register-notification-checkbox'
              type='checkbox'
              onChange={(e) => setNotification(e.target.checked)}></input>
          </div>
          <div className='button-container'>
            <Link to='/check/check-in'>
              <button id="register-back-button" className='tw-btn'>Back</button>
            </Link>
            <button id="register-signup-button" className='tw-btn' type='submit'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
