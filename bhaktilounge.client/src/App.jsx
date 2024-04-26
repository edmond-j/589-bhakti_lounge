import "./App.css";
import { Link } from "react-router-dom";

function App() {
    return (
        <div>
            <h1 id="tabelLabel">User Login</h1>
            <p>This component demonstrates fetching data from the server.</p>

            <Link to="/check-in">Login</Link>
            <br />
            <Link to="/management/activity">Activity</Link>
            <br />
            <Link to="/management/event">Event</Link>
        </div>
    );
}

export default App;