import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import CheckIn from './pages/CheckIn.jsx';
import Register from './pages/Register.jsx';
import TopUp from './pages/TopUp.jsx';
import Dashboard from './pages/Management/Dashboard.jsx';
import Activity from './pages/Management/Activity.jsx';
import Event from './pages/Management/Event.jsx';
import Membership from './pages/Management/Membership.jsx';
import Acquisition from './pages/Management/Acquisition.jsx';
import User from './pages/Management/User.jsx';
import NotFound from './pages/Management/NotFound.jsx';
import MgmtLayout from './pages/Mgmt-Layout.jsx';
import ChkLayout from './pages/Chk-Layout.jsx';
import SubscriptionForm from './pages/Subscribe.jsx';
import ProtectedRoute from '@/ProtectedRoute.jsx';
import { Provider } from 'react-redux';
import store from './services/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/check' element={<ChkLayout />}>
                        <Route path='check-in' element={<CheckIn />} />
                        <Route path='register' element={<Register />} />
                        <Route path='top-up' element={<TopUp />} />
                        <Route
                            path='subscribe/:id'
                            element={<SubscriptionForm />}
                        />
                    </Route>
                    <Route
                        path='/management'
                        element={
                            <ProtectedRoute>
                                <MgmtLayout />
                            </ProtectedRoute>
                        }>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='activity' element={<Activity />} />
                        <Route path='event' element={<Event />} />
                        <Route path='membership' element={<Membership />} />
                        <Route path='acquisition' element={<Acquisition />} />
                        <Route path='user' element={<User />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
