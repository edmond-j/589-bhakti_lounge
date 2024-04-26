import React from "react";
import { useState, useEffect } from "react";

function UpdateActivity({ item, onDelete }) {
  if (!item) {
    return <p>Loading...</p>;
  }
  useEffect(() => {
    //导致问题：Internal React error: Expected static flag was missing.
    setName(item.name);
    setPrice(item.price);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    setDaysOfWeek(item.daysOfWeek[0]);
    setYoga(item.includeYoga);
    setDinner(item.includeDinner);
  }, [item]);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [startTime, setStartTime] = useState(item.startTime);
  const [endTime, setEndTime] = useState(item.endTime);
  const [daysOfWeek, setDaysOfWeek] = useState(item.daysOfWeek[0]);
  const [includeYoga, setYoga] = useState(item.includeYoga || false);
  const [includeDinner, setDinner] = useState(item.includeDinner || false);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleStartTimeChange(event) {
    setStartTime(event.target.value);
  }

  function handleEndTimeChange(event) {
    setEndTime(event.target.value);
  }
  function handleDaysOfWeek(event) {
    setDaysOfWeek(event.target.value);
  }
  function handleIncludeYoga(event) {
    setYoga(event.target.checked);
  }
  function handleIncludeDinner(event) {
    setDinner(event.target.checked);
  }

  function writeNewData() {
    let newData = {
      id: item.id,
      name: name,
      price: price,
      startTime: startTime,
      endTime: endTime,
      daysOfWeek: [daysOfWeek],
      includeYoga: includeYoga,
      includeDinner: includeDinner,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    fetch("/api/v1/activity", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("Update Succesful:", data))
      .catch((error) => console.error("Error:", error));
  }

  function deleteData() {
    const url = "/api/v1/activity?Id=" + item.id;
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
      <label htmlFor="mgt-name">Activity Name*</label>
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
      <label htmlFor="days">Days</label>
      <select
        id="days"
        value={daysOfWeek == null ? "Monday" : daysOfWeek}
        onChange={handleDaysOfWeek}
      >
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>
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
      <label htmlFor="include-yoga">Include Yoga</label>
      <input
        type="checkbox"
        id="include-yoga"
        checked={includeYoga}
        onChange={handleIncludeYoga}
      />
      <label htmlFor="include-dinner">Include Dinner</label>
      <input
        type="checkbox"
        id="include-dinner"
        checked={includeDinner}
        onChange={handleIncludeDinner}
      />

      <button onClick={writeNewData}>Update</button>
      <button onClick={deleteData}>Delete</button>
    </div>
  );
}

export default UpdateActivity;
