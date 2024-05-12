import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ItemList from "/src/components/management/ItemList";
import ToolBar from "../../components/management/ToolBar";
import OptionButton from "../../components/management/OptionButton";
import { itemHighlight } from "./method";
import spinner from "/public/spinner.svg";

function Event() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function populateActivityData() {
            fetch("/api/v1/event")
                .then((response) => response.json())
                .then((data) => {
                    console.log("acquire", data);
                    setLoading(false);
                    if (data.length > 0) {
                        setItems(data);
                        setSelectedItem(data[0]);
                    }
                });
        }
        populateActivityData();
    }, []);

    useEffect(() => itemHighlight(selectedItem), [selectedItem]);

    function UpdateItemForm() {
        let content = null;
        if (isLoading) {
            content = (
                <div className="flex p-6 h-full bg-gray-200 rounded-br-2xl justify-center">
                    <img src={spinner} width="96px" alt="spinner" />
                </div>
            );
        } else if (!selectedItem) {
            content = (
                <div className="flex p-6 h-full bg-gray-200 rounded-br-2xl justify-center">
                    <label
                        className="font-bold text-4xl text-gray-400 mt-40"
                        htmlFor="">
                        No Data
                    </label>
                </div>
            );
        } else {
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

            function updateData() {
                let newData = {
                    id: selectedItem.id,
                    name,
                    price,
                    date,
                    startTime,
                    endTime,
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
                        // alert(data.name + " has been updated!");
                        toast.success(data.name + " has been updated!");
                        const updatedItems = items.map((item) =>
                            item.id === data.id ? data : item
                        );
                        setItems(updatedItems); //update the frontend activities after backend data updated
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
                fetch(url, requestOptions).then((response) => {
                    console.log(response);
                    toast.success(selectedItem.name + " has been deleted.");
                });
                const index = items.indexOf(selectedItem);
                setItems((currentItems) =>
                    currentItems.filter((item) => item !== selectedItem)
                ); //remove the deleted activity
                if (index > 0) {
                    setSelectedItem(items[index - 1]);
                } else {
                    if (items.length == 1)
                        //when the activities has only 1 element
                        setSelectedItem(null);
                    else setSelectedItem(items[index]);
                }
            }
            content = (
                <div className="grid grid-cols-3 gap-6 flex-grow p-6 overflow-auto bg-gray-200 rounded-br-2xl">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4">{name}</h1>
                        <p>ID: {selectedItem.id}</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="mgt-name">Event Name*</label>
                        <input
                            type="text"
                            id="mgt-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className=" twinput"
                        />
                        <label htmlFor="price">Price (NZD)*</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className=" twinput"
                        />
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className=" twinput"
                        />
                        <label htmlFor="start-time">Start Time</label>
                        <input
                            type="time"
                            id="start-time"
                            value={startTime || "00:00"}
                            onChange={(e) => setStartTime(e.target.value)}
                            className=" twinput"
                        />
                        <label htmlFor="end-time">End Time</label>
                        <input
                            type="time"
                            id="end-time"
                            value={endTime || "00:00"}
                            onChange={(e) => setEndTime(e.target.value)}
                            className=" twinput"
                        />
                        <OptionButton
                            updateData={updateData}
                            deleteData={deleteData}
                        />
                    </div>
                </div>
            );
        }
        // console.log(selectedItem.id);

        return (
            <div className="flex flex-col flex-grow min-w-max">
                <ToolBar title="Event" />
                {content}
            </div>
        );
    }

    return (
        <>
            <ItemList
                type={"event"}
                items={items}
                setItem={setItems}
                setSelectedItem={setSelectedItem}
            />
            <UpdateItemForm />
        </>
    );
}

export default Event;
