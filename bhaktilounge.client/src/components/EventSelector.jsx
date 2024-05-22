import { useState, useEffect } from "react";
import authFetch from "@/utils/authFetch.js";

function EventSelector({ onEventSelect }) {
  const [events, setEvents] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchEvents = async (value) => {
    try {
      const response = await authFetch(`/api/v1/CompData/CustomerOption`);
      const result = await response.json();
      const data = result.events || [];
      console.log("events data", data);
      if (data && Array.isArray(data) && data.length > 0) {
        setEvents(
          data.map((event) => ({
            ...event,
            selected: false,
          })),
        );
      } else {
        setEvents([
          {
            id: -1,
            name: "No Event Avaliable Today",
            price: -10,
            selected: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setEvents([
        { id: -1, name: "Failed to fetch data", price: -10, selected: false },
      ]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = (id) => {
    const updatedEvents = events.map((event) => {
      if (event.id === id) {
        return { ...event, selected: !event.selected };
      }
      return event;
    });

    setEvents(updatedEvents);
    const selectedEvents = updatedEvents.filter((event) => event.selected);
    onEventSelect(selectedEvents);
  };

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <div className="form-group">
      <label>Thursday Event</label>
      <input
        htmlFor="events"
        type="text"
        value={"Select Event ▼"}
        readOnly
        onClick={toggleList}
      />
      {showList && (
        <ul className="suggestions-list">
          {events.map((event) => (
            <li key={event.id} className="multi-select-item">
              <label
                className={`multi-select-label ${event.id === -1 ? "disabled" : ""
                  }`}
              >
                {event.id !== -1 && (
                  <input
                    type="checkbox"
                    checked={event.selected || false}
                    onChange={() => handleSelectEvent(event.id)}
                  />
                )}
                {event.id !== -1
                  ? `${event.name}: $${event.price}`
                  : event.name}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventSelector;
