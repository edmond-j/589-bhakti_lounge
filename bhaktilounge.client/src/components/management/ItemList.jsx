import React from "react";

function ItemList({ type, items, setItem, setSelectedItem }) {
    if (!items || items.length === 0) {
        return (
            <div>
                <p>Empty</p>
                <button onClick={createNew}>Add New</button>
            </div>
        );
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
            body: JSON.stringify({}) 
        };
        fetch(`/api/v1/${type}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log("New Activity Created:", data);
                // refreshData().then(() => {
                // });
                setItem((prevItems) => [...prevItems, data]);
                setSelectedItem(data); // Ensure refreshData() is complete
            })
            .catch((error) => console.error("Error:", error));
        // onAdd(newData);
    }

    return (
        <div>
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