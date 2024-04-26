import React from "react";
import { useEffect, useState } from "react";
import "./management.css";

import ItemList from "./components/management/ItemList";
import UpdateActivity from "./components/management/UpdateActivity";

function Activity() {
  const [activities, setActivity] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    populateActivityData();
  }, []);

  async function populateActivityData() {
    const response = await fetch("/api/v1/activity");
    const data = await response.json();
    console.log("data:", data);
    setActivity(data);
  }
  console.log(activities[0]);
  console.log(activities);

  function handleSelectItem(item) {
    setSelectedItem(item);
    // console.log(item.name);
  }

  function handleDelete(itemToDelete) {
    setActivity((currentItems) =>
      currentItems.filter((item) => item !== itemToDelete)
    );
  }

  function handleAdd(itemToAdd) {
    setActivity(activities.concat(itemToAdd))
  }

  return (
    <div className="container">
      <ItemList
        items={activities}
        setActivity={setActivity}
        onSelectItem={handleSelectItem}
        onAdd={handleAdd}
      />
      <UpdateActivity
        item={selectedItem == null ? activities[0] : selectedItem}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Activity;
