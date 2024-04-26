import React from "react";
import { useEffect, useState } from "react";
import "./management.css";

import ItemList from "./components/management/ItemList";
import UpdateEvent from "./components/management/UpdateEvent";

function OneOffEvent() {
  const [events, setEvent] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    populateEventData();
  }, []);

  async function populateEventData() {
    const response = await fetch("/api/v1/event");
    const data = await response.json();
    console.log("data:", data);
    setEvent(data);
  }
  console.log(events);

  function handleSelectItem(item) {
    setSelectedItem(item);
    // console.log(item.name);
  }

  function handleDelete(itemToDelete) {
    setEvent((currentItems) =>
      currentItems.filter((item) => item !== itemToDelete)
    );
  }

  function handleAdd(itemToAdd) {
    setEvent(events.concat(itemToAdd))
  }

  return (
    <div className="container">
      <ItemList
        items={events}
        setItem={setEvent}
        onSelectItem={handleSelectItem}
        onAdd={handleAdd}
      />
      <UpdateEvent
        item={selectedItem == null ? events[0] : selectedItem}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default OneOffEvent;
