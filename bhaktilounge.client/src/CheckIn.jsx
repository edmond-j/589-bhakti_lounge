import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CheckIn() {
    const [events, setEvents] = useState();

    useEffect(() => {
        populateEventData();
    }, []);

    const contents =
        events === undefined ? (
            <p>
                <em>
                    Loading... Please refresh once the ASP.NET backend has started. See{" "}
                    <a href="https://aka.ms/jspsintegrationreact">
                        https://aka.ms/jspsintegrationreact
                    </a>{" "}
                    for more details.
                </em>
            </p>
        ) : (
            //   <Link to="/check-in">To Check In</Link>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

    async function populateEventData() {
        const response = await fetch("/api/v1/event");
        const data = await response.json();
        setEvents(data);
    }

    return (
        <div>
            <h1>This is Check In</h1>
            {contents}
            <Link to="/">Log Out</Link>
            <br />
            <Link to="/register">New User?</Link>
            <br />
            <Link to="/top-up">Top Up</Link>
        </div>
    );
}

export default CheckIn;