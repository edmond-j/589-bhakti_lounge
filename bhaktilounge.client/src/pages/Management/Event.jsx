import React from "react";
import { useEffect, useState } from "react";


import ItemList from "../../components/management/ItemList";
import UpdateEvent from "../../components/management/UpdateEvent.jsx";

function Event() {
  const [events, setEvent] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    populateEventData();
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      const element = document.getElementById(`item-${selectedItem.id}`);
      // console.log("element", element);
      if (element) {
        element.focus();
      }
    }
  }, [selectedItem]);

  async function populateEventData() {
    fetch("/api/v1/event")
      .then((response) => response.json())
      .then((data) => {
        console.log("popu", data);
        //如果没有data该怎么办？
        if (data) {
          setEvent(data);
          setSelectedItem(data[0]);
        }
      });
  }

  function handleDelete(itemToDelete) {
    const index = events.indexOf(itemToDelete);
    setEvent((currentItems) =>
      currentItems.filter((item) => item !== itemToDelete)
    );
    if (index > 0) {
      setSelectedItem(events[index - 1]);
    } else {
      if (events.length == 1) setSelectedItem(null);
      else setSelectedItem(events[index]);
    }
  }



  return (
    <>
      <div className="container">
        <div className="mgt-list">
          <ItemList
            type={"event"}
            items={events}
            setItem={setEvent}
            setSelectedItem={setSelectedItem}
          />
        </div>
        <UpdateEvent selectedItem={selectedItem} handleDelete={handleDelete} />
      </div>
    </>
  );
}
export default Event;
