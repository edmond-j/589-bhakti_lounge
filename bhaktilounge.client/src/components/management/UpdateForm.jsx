import React from "react";
import { useState, useEffect } from "react";

function UpdateForm({ selectedItem }) {
  if (!selectedItem) {
    return <p>Loading...</p>;
  }
  useEffect(() => { //导致问题：Internal React error: Expected static flag was missing. 
    setName(selectedItem.name);
    setPrice(selectedItem.price);
    setStartTime(selectedItem.startTime);
    setEndTime(selectedItem.endTime);
  }, [selectedItem]);
  const [name, setName] = useState(selectedItem.name);
  const [price, setPrice] = useState(selectedItem.price);
  const [startTime, setStartTime] = useState(selectedItem.startTime);
  const [endTime, setEndTime] = useState(selectedItem.endTime);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleStartTimeChange(event) {
    const timeValue = event.target.value; // 获取时间输入框的值，格式 "HH:MM"
    const [hour, minute] = timeValue.split(":").map(Number); // 分割字符串并转换为数字

    setStartTime({
      hour: hour,
      minute: minute,
    });
  }

  function handleEndTimeChange(event) {
    const timeValue = event.target.value; // 获取时间输入框的值，格式 "HH:MM"
    const [hour, minute] = timeValue.split(":").map(Number); // 分割字符串并转换为数字

    setEndTime({
      hour: hour,
      minute: minute,
    });
  }

  function upDateForm() {
    console.log(name);
    console.log(price);
    console.log(startTime.hour + ":" + startTime.minute);
    console.log(endTime.hour + ":" + endTime.minute);
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
      <select id="days">
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
        <option>Saturday</option>
        <option>Sunday</option>
      </select>

      <label htmlFor="start-time">Start Time</label>
      <input
        type="time"
        id="start-time"
        value={startTime.hour + ":" + startTime.minute}
        onChange={handleStartTimeChange}
      />

      <label htmlFor="end-time">End Time</label>
      <input
        type="time"
        id="end-time"
        value={endTime.hour + ":" + endTime.minute}
        onChange={handleEndTimeChange}
      />

      <label htmlFor="include-dinner">Include Dinner</label>
      <input type="checkbox" id="include-dinner" />

      <button onClick={upDateForm}>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default UpdateForm;
