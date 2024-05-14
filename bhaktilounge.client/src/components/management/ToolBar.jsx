import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function ToolBar({ title }) {
    return (
        <div className="flex items-center flex-shrink-0 h-16 px-8  bg-white rounded-tr-2xl">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="grow"></div>
            <div className="flex items-center justify-end space-x-8 ">
                <FaUserCircle className="w-8 h-8"/>
                <label>Administrator</label>
                <Link to="/" className="text-blue-700 font-bold">Logout</Link>
                
            </div>
        </div>
    );
}

export default ToolBar;
