import React from "react";

function ItemList({ items, setActivity, onSelectItem, onAdd }) {
  if (!items || items.length === 0) {
    return <p>Loading...</p>; // 或其他加载指示器
  }

  function createNew() {
    const newData = {
      name: "new activity",
      price: 0,
      startTime: "00:00",
      endTime: "00:00",
      daysOfWeek: ["Monday"]
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    fetch("/api/v1/activity", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setActivity((prevActivities) => [...prevActivities, data]);
        console.log("New Activity Created:", data);
      })
      .catch((error) => console.error("Error:", error));
    onAdd(newData);
    onSelectItem(newData);
  }

  return (
    <div className="mgt-list">
      {/* <p>{items[0].name}</p> */}
      {items.map((item) => (
        <div
          className="mgt-list-item"
          tabIndex="0"
          key={item.id}
          onClick={() => onSelectItem(item)}
        >
          {item.name}
        </div>
      ))}
      <button onClick={createNew}>Add New</button>
    </div>
  );
}

export default ItemList;
