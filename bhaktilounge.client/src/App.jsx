import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1 id="tabelLabel">User Login</h1>
      <p>This component demonstrates fetching data from the server.</p>
      <div className="form-group">
        <Link to="/check-in">Login</Link>
        <Link to="/new-check-in">NewCheck-in</Link>
        <Link to="/management/activity">Activity</Link>
        <br/>
        <Link to="/management/event">Event</Link>
      </div>
    </div>
  );
}

export default App;