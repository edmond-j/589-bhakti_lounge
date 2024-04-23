import React from "react";
import { useState } from "react";

function UpdateForm({ items }) {
  if (!items || items.length === 0) {
    return <p>Loading...</p>; // 或其他加载指示器
  }
  console.log("updateForm" + items[0].name);
  // const [name, setName] = useState(item.name);

  // function handleChange(event){
  //     setName(event.target.value);
  // }

  return (
    <div className="mgt-form">
      <h2>Activity</h2>
      <label htmlFor="mgt-name">Activity Name*</label>
      <input type="text" id="mgt-name" value={items[0].name} />
      <label htmlFor="price">Price (NZD)*</label>
      <input type="number" id="price" value={items[0].price} />
      <label htmlFor="days">Days</label>
      <select id="days">
        <option selected>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
      </select>

      <label htmlFor="start-time">Start Time</label>
      <input type="time" id="start-time" value="17:30" />

      <label htmlFor="end-time">End Time</label>
      <input type="time" id="end-time" value="18:15" />

      <label htmlFor="include-dinner">Include Dinner</label>
      <input type="checkbox" id="include-dinner" />

      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default UpdateForm;
