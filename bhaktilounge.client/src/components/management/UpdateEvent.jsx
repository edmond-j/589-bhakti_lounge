import React from "react";
import { useState, useEffect } from "react";

function UpdateEvent({ item, onDelete }) {
  if (!item) {
    return <p>Loading...</p>;
  }
  useEffect(() => {
    //导致问题：Internal React error: Expected static flag was missing.
    setName(item.name);
    setPrice(item.price);
    setDate(item.date);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
  }, [item]);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [date, setDate] = useState(item.date);
  const [startTime, setStartTime] = useState(item.startTime);
  const [endTime, setEndTime] = useState(item.endTime);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePriceChange(event) {
    setPrice(event.target.value);
  }
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleStartTimeChange(event) {
    setStartTime(event.target.value);
  }

  function handleEndTimeChange(event) {
    setEndTime(event.target.value);
  }

  function writeNewData() {
    let newData = {
      id: item.id,
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
    fetch("/api/v1/event", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("Update Succesful:", data))
      .catch((error) => console.error("Error:", error));
  }

  function deleteData() {
    const url = "/api/v1/event?Id=" + item.id;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions).then((response) => console.log(response));
    // .then(data => console.log('Delete Succesful:', data))
    // .catch(error => console.error('Error:', error));
    onDelete(item);
  }

  return (
    <div className="mgt-form">
      <h2>{name}</h2>
      <label htmlFor="mgt-name">Event Name*</label>
      <input
        type="text"
        id="mgt-name"
        value={name}
        onChange={handleNameChange}
      />
      <label htmlFor="price">Price (NZD)*</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={handlePriceChange}
      />
      <label htmlFor="date">Date</label>
      <input type="date" id="date" value={date} onChange={handleDateChange} />
      {/* <MultiDaysSelectDropdown initialDays={daysOfWeek}/> */}

      <label htmlFor="start-time">Start Time</label>
      <input
        type="time"
        id="start-time"
        value={startTime == null ? "00:00" : startTime}
        onChange={handleStartTimeChange}
      />

      <label htmlFor="end-time">End Time</label>
      <input
        type="time"
        id="end-time"
        value={endTime == null ? "00:00" : endTime}
        onChange={handleEndTimeChange}
      />

      <button onClick={writeNewData}>Update</button>
      <button onClick={deleteData}>Delete</button>
    </div>
  );
}

export default UpdateEvent;
