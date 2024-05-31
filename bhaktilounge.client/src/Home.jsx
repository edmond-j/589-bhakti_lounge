import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1 id="tabelLabel">User Login</h1>
            <p>This component demonstrates fetching data from the server.</p>

            <Link to="/check-in">Login</Link>
        </div>
    );
}

export default Home;