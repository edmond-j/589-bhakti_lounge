import React, {useEffect, useState} from "react";

function UpdateEvent({selectedItem, handleDelete}) {
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

export default UpdateEvent;