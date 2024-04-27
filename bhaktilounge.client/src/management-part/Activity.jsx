import React from "react";
import { useEffect, useState } from "react";
import "./management.css";

import ItemList from "../components/management/ItemList";
import MgtHeader from "../components/management/MgtHeader";

function Activity() {
  const [activities, setActivity] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    populateActivityData();
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

  async function populateActivityData() {
    // const response = await fetch("/api/v1/activity");
    // const data = await response.json();
    // setActivity(data);
    //设定selectedItem
    fetch("/api/v1/activity")
      .then((response) => response.json())
      .then((data) => {
        console.log("popu", data);
        //如果没有data该怎么办？
        if (data) {
          setActivity(data);
          setSelectedItem(data[0]);
        }
      });
  }

  function handleDelete(itemToDelete) {
    const index = activities.indexOf(itemToDelete);
    setActivity((currentItems) =>
      currentItems.filter((item) => item !== itemToDelete)
    );
    if (index > 0) {
      setSelectedItem(activities[index - 1]);
    } else {
      if (activities.length == 1)
        //删除最后一个元素
        setSelectedItem(null);
      else setSelectedItem(activities[index]);
    }
  }

  // function handleAdd(itemToAdd) {
  //   setActivity(activities.concat(itemToAdd))
  // }

  function UpdateActivity() {
    if (!selectedItem) {
      return (
        <div className="mgt-form" style={{ textAlign: "center" }}>
          <p>No Data</p>
        </div>
      );
    }
    // console.log(selectedItem.id);
    useEffect(() => {
      //导致问题：Internal React error: Expected static flag was missing.
      setName(selectedItem.name);
      setPrice(selectedItem.price);
      setStartTime(selectedItem.startTime);
      setEndTime(selectedItem.endTime);
      setDaysOfWeek(selectedItem.daysOfWeek[0]);
      setYoga(selectedItem.includeYoga);
      setDinner(selectedItem.includeDinner);
    }, [selectedItem]);
    const [name, setName] = useState(selectedItem.name);
    const [price, setPrice] = useState(selectedItem.price);
    const [startTime, setStartTime] = useState(selectedItem.startTime);
    const [endTime, setEndTime] = useState(selectedItem.endTime);
    const [daysOfWeek, setDaysOfWeek] = useState(selectedItem.daysOfWeek[0]);
    const [includeYoga, setYoga] = useState(selectedItem.includeYoga || false);
    const [includeDinner, setDinner] = useState(
      selectedItem.includeDinner || false
    );

    function writeNewData() {
      let newData = {
        id: selectedItem.id,
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
      // console.log(JSON.stringify(newData));
      fetch("/api/v1/activity", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Update Succesful:", data);
          // populateActivityData();
          const updatedActivities = activities.map((item) =>
            item.id === data.id ? data : item
          );
          setActivity(updatedActivities);
          setSelectedItem(data);
        })
        .catch((error) => console.error("Error:", error));
    }

    function deleteData() {
      const url = "/api/v1/activity?Id=" + selectedItem.id;
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      fetch(url, requestOptions).then((response) => console.log(response));
      // .then(data => console.log('Delete Succesful:', data))
      // .catch(error => console.error('Error:', error));
      handleDelete(selectedItem);
    }

    return (
      <div className="mgt-form">
        <h2>{selectedItem.name}</h2>
        <label htmlFor="mgt-name">Activity Name*</label>
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
        <label htmlFor="days">Days</label>
        <select
          id="days"
          value={daysOfWeek}
          onChange={(e) => setDaysOfWeek(e.target.value)}
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
        <label htmlFor="include-yoga">Include Yoga</label>
        <input
          type="checkbox"
          id="include-yoga"
          checked={includeYoga}
          onChange={(e) => setYoga(e.target.checked)}
        />
        <label htmlFor="include-dinner">Include Dinner</label>
        <input
          type="checkbox"
          id="include-dinner"
          checked={includeDinner}
          onChange={(e) => setDinner(e.target.checked)}
        />

        <button onClick={writeNewData}>Update</button>
        <button onClick={deleteData}>Delete</button>
      </div>
    );
  }

  return (
    <>
      <MgtHeader />
      <div className="container">
        <div className="mgt-list">
          <ItemList
            type={"activity"}
            items={activities}
            setItem={setActivity}
            setSelectedItem={setSelectedItem}
            // onAdd={handleAdd}
          />
        </div>
        {/* <UpdateActivity
        item={selectedItem == null ? activities[0] : selectedItem}
        onDelete={handleDelete}
      /> */}
        <UpdateActivity />
      </div>
    </>
  );
}

export default Activity;
