import React from "react";
import { useEffect, useState } from "react";


import ItemList from "../../components/management/ItemList";

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

  function UpdateEvent() {
    if (!selectedItem) {
      return (
        <div className="mgt-form" style={{ textAlign: "center" }}>
          <p>No Data</p>
        </div>
      );
    }
    // console.log(selectedItem.id);
    useEffect(() => {
      setName(selectedItem.name);
      setPrice(selectedItem.price);
      setStartTime(selectedItem.startTime);
      setEndTime(selectedItem.endTime);
      setDate(selectedItem.date);
    }, [selectedItem]);
    const [name, setName] = useState(selectedItem.name);
    const [price, setPrice] = useState(selectedItem.price);
    const [date, setDate] = useState(selectedItem.date);
    const [startTime, setStartTime] = useState(selectedItem.startTime);
    const [endTime, setEndTime] = useState(selectedItem.endTime);

    function writeNewData() {
      let newData = {
        id: selectedItem.id,
        name: name,
        price: price,
        date: date,
        startTime: startTime,
        endTime: endTime,
      };

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      };
      // console.log(JSON.stringify(newData));
      fetch("/api/v1/event", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Update Succesful:", data);
          alert(data.name+" has been updated!")
          const updatedItems = events.map((item) =>
            item.id === data.id ? data : item
          );
          setEvent(updatedItems);
          setSelectedItem(data);
        })
        .catch((error) => console.error("Error:", error));
    }

    function deleteData() {
      const url = "/api/v1/event?Id=" + selectedItem.id;
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      fetch(url, requestOptions).then((response) => console.log(response));
      handleDelete(selectedItem);
    }

    return (
      <div className="mgt-form">
        <h2>{selectedItem.name}</h2>
        <label htmlFor="mgt-name">Event Name*</label>
        <input
          type="text"
          id="mgt-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">Price (NZD)*</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="start-time">Start Time</label>
        <input
          type="time"
          id="start-time"
          value={startTime || "00:00"}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="end-time">End Time</label>
        <input
          type="time"
          id="end-time"
          value={endTime || "00:00"}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button onClick={writeNewData}>Update</button>
        <button onClick={deleteData}>Delete</button>
      </div>
    );
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
        <UpdateEvent />
      </div>
    </>
  );
}
export default Event;
