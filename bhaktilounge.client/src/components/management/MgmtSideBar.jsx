import { NavLink } from "react-router-dom";
import React from "react";
import { GrDashboard } from "react-icons/gr";
import { GrYoga } from "react-icons/gr";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { ImExit } from "react-icons/im";

function MgmtSideBar() {
    let linkClass =({ isActive }) =>
        "flex items-center w-full h-12 px-3 mt-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 " +
         (isActive ? "  bg-gray-300 text-gray-900" : " bg-gray-900");
    return (
        <div className="flex flex-col items-center w-64 min-w-64 h-full text-gray-400 bg-gray-900 rounded-l-2xl">
            <div className="flex items-center w-full px-3 mt-3">
                <img src="/public/bhakti-logo-alt.webp" alt="logo" />

            </div>
            <div className="flex justify-center w-full px-3 mt-3">
                {/* <GrYoga className="w-12 h-12 stroke-current"/> */}
                <label className="text-lg font-bold text-primary">
                    Management System
                </label>
            </div>

            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                    <NavLink className={linkClass} to="report">
                        <GrDashboard className="w-6 h-6 stroke-current" />
                        <span className="ml-2 text-base font-medium">
                            Dasboard
                        </span>
                    </NavLink>
                    <NavLink className={linkClass} to="activity">
                        <GrYoga className="w-6 h-6 stroke-current" />
                        <span className="ml-2 text-base font-medium">
                            Activity
                        </span>
                    </NavLink>
                    <NavLink className={linkClass} to="event">
                        <MdOutlineEmojiEvents className="w-6 h-6 stroke-current" />
                        <span className="ml-2 text-base font-medium">
                            Event
                        </span>
                    </NavLink>
                    <NavLink className={linkClass} to="membership">
                        <FaPeopleGroup className="w-6 h-6 stroke-current" />
                        <span className="ml-2 text-base font-medium">
                            Membership
                        </span>
                    </NavLink>
                    <NavLink className={linkClass} to="misc">
                        <MdOutlineDisplaySettings className="w-6 h-6 stroke-current" />
                        <span className="ml-2 text-base font-medium">Misc</span>
                    </NavLink>
                </div>
                <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                    <NavLink className={linkClass} to="user">
                    <FaUserLock className="w-6 h-6 stroke-current"/>
                        <span className="ml-2 text-base font-medium">User</span>
                    </NavLink>
                </div>
            </div>
            <a href="/check-in" className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300 rounded-bl-2xl">
                <ImExit className="w-6 h-6 stroke-current"/>
                <span className="ml-2 text-base font-bold">To Check In</span>
            </a>
        </div>
    );
}

export default MgmtSideBar;
