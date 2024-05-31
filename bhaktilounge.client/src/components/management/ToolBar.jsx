import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate}  from "react-router-dom";
import {clearToken} from "@/services/tokenSlice.js";
import {clearUserName} from "@/services/userNameSlice.js";
import {clearUserRole} from "@/services/userRoleSlice.js";

function ToolBar({ title }) {
    const userName = useSelector((state) => state.userName);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logout() {
        dispatch(clearToken());
        dispatch(clearUserName());
        dispatch(clearUserRole());
        navigate("/");
    }
    return (
        <div className="flex items-center flex-shrink-0 h-16 px-8 border-b bg-white rounded-tr-2xl">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="grow"></div>
            <div className="flex items-center justify-end space-x-8 ">
                <FaUserCircle className="w-8 h-8"/>
                <label>{userName.value}</label>
                <button onClick={logout} className="text-blue-700 font-bold">Logout</button>
            </div>
        </div>
    );
}

export default ToolBar;
