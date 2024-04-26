import React from "react";

function ItemList({ items, setSelectedItem, refreshData }) {
  if (!items || items.length === 0) {
    return (
      <div className="mgt-list">
        <p>Loading...</p>
      </div>
    ); // 或其他加载指示器
  }

  function createNew() {
    // const newData = {
    //   name: "new activity",
    //   price: 0,
    //   startTime: "00:00",
    //   endTime: "00:00",
    //   daysOfWeek: ["Monday"]
    // };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/v1/activity/createdefault", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // setItem((prevActivities) => [...prevActivities, data]);
        console.log("New Activity Created:", data);
        refreshData().then(() => {
          setSelectedItem(data); // Ensure refreshData() is complete
        });
      })
      .catch((error) => console.error("Error:", error));
    // onAdd(newData);
  }

  return (
    <div className="mgt-list">
      {/* <p>{items[0].name}</p> */}
      {items.map((item) => (
        <div
          className="mgt-list-item"
          id={`item-${item.id}`}
          tabIndex="0"
          key={item.id}
          onClick={() => setSelectedItem(item)}
        >
          {item.name}
        </div>
      ))}
      <button onClick={createNew}>Add New</button>
    </div>
  );
}

export default ItemList;
