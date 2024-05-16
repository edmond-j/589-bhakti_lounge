import "./main.css"
import "./style.css"
import React from "react";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">

            <h2 className="">Welcome to Bhakti Lounge</h2>
            <h3 className="">Check In System</h3>
            <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" action="">
                <label className="font-semibold text-sm" htmlFor="usernameField">Username</label>
                <input className="tw-input" type="text" />
                <label className="font-semibold text-sm mt-3" htmlFor="passwordField">Password</label>
                <input className="tw-input" type="password" />
                    <Link to={"/check/check-in"}>
                <button className="tw-btn w-64 mt-8">
                    Login
                    </button>
                    </Link>
                <div className="flex mt-6 justify-center text-xs">
                    <a className="text-blue-400 hover:text-blue-500" href="/check/check-in">Check In</a>
                    <span className="mx-2 text-gray-300">/</span>
                    <a className="text-blue-400 hover:text-blue-500" href="/management/activity">Management</a>
                </div>
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

export default App;