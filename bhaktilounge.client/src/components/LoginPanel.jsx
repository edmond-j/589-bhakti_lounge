import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/services/tokenSlice.js";
import { setUserName } from "@/services/userNameSlice.js";
import { setUserRole } from "@/services/userRoleSlice.js";
import { useNavigate } from "react-router-dom";

export function LoginPanel() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    let newData = {
      username: username,
      password: password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };

    fetch("/api/v1/Auth/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Login Successful:", data);
        dispatch(setToken(data.token));
        dispatch(setUserName(data.userName));
        dispatch(setUserRole(data.userRole));
        navigate("/check/check-in");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Authentication failed!");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h2 className="">Welcome to Bhakti Lounge</h2>
      <h3 className="">Check In System</h3>
      <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
        <label className="font-semibold text-sm">Username</label>
        <input
          className="tw-input"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className="font-semibold text-sm mt-3">Password</label>
        <input
          className="tw-input"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="tw-btn w-64 mt-8" onClick={login}>
          Login
        </button>
        {/*                <div className="flex mt-6 justify-center text-xs">
                    <p className="block">Temporary Entry:</p>
                    <a className="text-blue-400 hover:text-blue-500" href="/check/check-in">Check In</a>
                    <span className="mx-2 text-gray-300">/</span>
                    <a className="text-blue-400 hover:text-blue-500" href="/management/activity">Management</a>
                </div>*/}
      </form>
    </div>
    // <div>
    //     <p>This component demonstrates fetching data from the server.</p>
    //     <div classNameName="form-group">
    //         <Link to="/check/check-in">Login</Link>
    //         <Link to="/check/register">Register</Link>
    //         <Link to="/management/activity">Activity</Link>
    //         <br />
    //         <Link to="/management/event">Event</Link>
    //     </div>
    // </div>
  );
}
