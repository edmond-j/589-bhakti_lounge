
import { NavLink } from "react-router-dom";
import logo from "../../assets/BhaktiLounge-Logo.png"

function MgmtHeader() {
    const linkClass=({isActive})=>isActive?"background-blue":"background-black";
    return (
        <div className="header">
        <div className="header-left">
            <a href="/check-in" className="back-link">To Check In</a>
            <img src={logo} height={"34px"} className="logo"/>
        </div>
        <div className="menu">
            <NavLink className={linkClass} to="report">Report</NavLink>
            <NavLink className={linkClass} to="activity">Activity</NavLink>
            <NavLink className={linkClass} to="event">Event</NavLink>
            <NavLink className={linkClass} to="member">Member</NavLink>
            <NavLink className={linkClass} to="misc">Misc</NavLink>
            <NavLink className={linkClass} to="user">User</NavLink>
        </div>
        <div className="user-info">
            <span>Administrator</span>
            <a href="/" className="logout-link">Log Out</a>
        </div>
    </div>
    )
    
}

export default MgmtHeader;