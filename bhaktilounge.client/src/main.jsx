import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckIn from "./CheckIn.jsx";
import Register from "./Register.jsx";
import TopUp from "./TopUp.jsx";
import Activity from "./Activity.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/check-in" element={<CheckIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/top-up" element={<TopUp />} />
                <Route path="/management/activity" element={<Activity />} />
            </Routes>
        </BrowserRouter>

    </React.StrictMode>
);