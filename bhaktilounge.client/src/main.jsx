import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckIn from "./CheckIn.jsx";
import Register from "./Register.jsx";
import TopUp from "./TopUp.jsx";
import Activity from "./management-part/Activity.jsx";
import Event from "./management-part/Event.jsx";
import MgmtLayout from "./layout/MgmtLayout.jsx";
import NotFound from "./management-part/NotFound.jsx";
import SubscriptionForm from "./Subscribe.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/register" element={<Register />} />
                <Route path="/top-up" element={<TopUp />} />
                <Route path="/subscribe" element={<SubscriptionForm />} />
        <Route path="/management" element={<MgmtLayout />}>
          <Route path="activity" element={<Activity />} />
          <Route path="event" element={<Event />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>


  </React.StrictMode>
);
