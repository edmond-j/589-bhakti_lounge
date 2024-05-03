import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckIn from "./pages/CheckIn.jsx";
import Register from "./pages/Register.jsx";
import TopUp from "./pages/TopUp.jsx";
import Activity from "./pages/Management/Activity.jsx";
import Event from "./pages/Management/Event.jsx";
import NotFound from "./pages/Management/NotFound.jsx";
import Management from "./pages/Management.jsx";
import NewCheckIn from "./pages/NewCheckIn.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/top-up" element={<TopUp />} />
        <Route path="/new-check-in" element={<NewCheckIn />} />
        <Route path="/management" element={<Management />}>
          <Route path="activity" element={<Activity />} />
          <Route path="event" element={<Event />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
