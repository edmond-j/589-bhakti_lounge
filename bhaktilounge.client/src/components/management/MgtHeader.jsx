import "../../management-part/management.css";
import { Link } from "react-router-dom";

function MgtHeader() {
    return (
        <div className="header">
        <div className="header-left">
            <a href="/check-in" className="back-link">To Check In</a>
            <img src="../../../public/BhaktiLounge-Logo.png" height={"34px"} className="logo"/>
        </div>
        <ul className="menu">
            <Link to="">Report</Link>
            <Link to="/management/activity">Activity</Link>
            <Link to="/management/event">Event</Link>
            <Link to="">Member</Link>
            <Link to="">Misc</Link>
            <Link to="">User</Link>
        </ul>
        <div className="user-info">
            <span>Administrator</span>
            <a href="/" className="logout-link">Log Out</a>
        </div>
    </div>
    )
    
}

export default MgtHeader;