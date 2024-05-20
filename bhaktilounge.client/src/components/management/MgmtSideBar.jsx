import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";
import { GrYoga, GrDashboard } from "react-icons/gr";
import { MdOutlineDisplaySettings, MdOutlineEmojiEvents } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa";
import { ImExit } from "react-icons/im";

function MgmtSideBar() {
    let linkClass = ({ isActive }) =>
        "flex items-center w-full h-10 px-3 mt-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 " +
        (isActive ? "  bg-gray-300 text-gray-900" : " bg-gray-900");
    return (
        <div className="flex flex-col items-center w-64 h-full text-gray-400 bg-gray-900 rounded-l-2xl">
            <div className="flex items-center w-full px-8 pt-6">
                <img src="/bhakti-logo-alt.webp" alt="logo" />
            </div>
            <div className="flex justify-center w-full px-3 mt-3">
                {/* <GrYoga className="w-12 h-12 stroke-current"/> */}
                <p className="text-lg font-bold text-primary">
                    Management System
                </p>
            </div>

            <div className="w-64 px-2">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                    <NavLink className={linkClass} to="dashboard">
                        <GrDashboard className="tw-sidebar-icon" />
                        <span className="tw-sidebar-item">Dashboard</span>
                    </NavLink>
                    <NavLink className={linkClass} to="activity">
                        <GrYoga className="tw-sidebar-icon" />
                        <span className="tw-sidebar-item">Activity</span>
                    </NavLink>
                    <NavLink className={linkClass} to="event">
                        <MdOutlineEmojiEvents className="tw-sidebar-icon" />
                        <span className="tw-sidebar-item">Event</span>
                    </NavLink>
                    <NavLink className={linkClass} to="membership">
                        <FaPeopleGroup className="tw-sidebar-icon" />
                        <span className="tw-sidebar-item">Membership</span>
                    </NavLink>
                    <NavLink className={linkClass} to="acquisition">
                        <MdOutlineDisplaySettings className="tw-sidebar-icon" />
                        <span className="tw-sidebar-item">Acquisition</span>
                    </NavLink>
                </div>
                <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                    <NavLink className={linkClass} to="user">
                        <FaUserLock className="tw-sidebar-icon" />
                        <span className="tw-sidebar-item">User</span>
                    </NavLink>
                </div>
            </div>
            <Link
                to="/check/check-in"
                className="flex items-center justify-center w-full h-14 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300 rounded-bl-2xl">
                <ImExit className="tw-sidebar-icon" />
                <span className="ml-2 text-base font-bold">To Check In</span>
            </Link>
        </div>
    );
}

export default MgmtSideBar;
