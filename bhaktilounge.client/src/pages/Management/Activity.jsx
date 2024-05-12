import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { toast } from "../../../node_modules/react-toastify/dist/index";
import ItemList from "/src/components/management/ItemList";
import ToolBar from "../../components/management/ToolBar";

function Activity() {
    const [activities, setActivity] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function populateActivityData() {
            // const response = await fetch("/api/v1/activity");
            // const data = await response.json();
            // setActivity(data);
            //设定selectedItem
            fetch("/api/v1/activity")
                .then((response) => response.json())
                .then((data) => {
                    console.log("acquire", data);
                    //如果没有data该怎么办？
                    setLoading(false);
                    if (data.length > 0) {
                        setActivity(data);
                        setSelectedItem(data[0]);
                    }
                });
        }
        populateActivityData();
    }, []);

    useEffect(() => {
        if (selectedItem !== null) {
            var ul = document.getElementById("mgmt-itemlist");
            var listItems = ul.getElementsByTagName("li");
            for (var i = 0; i < listItems.length; i++) {
                // 从每个 li 元素的 classList 中移除 'active' 类
                listItems[i].classList.remove("bg-gray-300");
            }
            const element = document.getElementById(`item-${selectedItem.id}`);
            // console.log("element", element);
            if (element) {
                element.classList.add("bg-gray-300");
            }
        }
    }, [selectedItem]);

    function UpdateActivity() {
        if (!selectedItem) {
            return (
                <div className="flex flex-col flex-grow min-w-max h-full">
                    <ToolBar title="Activity" />
                    <div className="flex p-6 h-full bg-gray-200 rounded-br-2xl justify-center">
                        <label className="font-bold text-4xl text-gray-400 mt-40" htmlFor=""> No Data</label>
                       </div>
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
        const [daysOfWeek, setDaysOfWeek] = useState(
            selectedItem.daysOfWeek[0]
        );
        const [includeYoga, setYoga] = useState(
            selectedItem.includeYoga || false
        );
        const [includeDinner, setDinner] = useState(
            selectedItem.includeDinner || false
        );

        function updateData() {
            let newData = {
                id: selectedItem.id,
                name, // name:name,
                price,
                startTime,
                endTime,
                daysOfWeek: [daysOfWeek],
                includeYoga,
                includeDinner,
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
                    // alert(data.name + " has been updated!");
                    toast.success(data.name + " has been updated!");
                    const updatedActivities = activities.map((item) =>
                        item.id === data.id ? data : item
                    );
                    setActivity(updatedActivities); //update the frontend activities after backend data updated
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
            fetch(url, requestOptions).then((response) => {
                console.log(response);
                toast.success(selectedItem.name + " has been deleted.");
            });
            const index = activities.indexOf(selectedItem);
            setActivity((currentItems) =>
                currentItems.filter((item) => item !== selectedItem)
            ); //remove the deleted activity
            if (index > 0) {
                setSelectedItem(activities[index - 1]);
            } else {
                if (activities.length == 1)
                    //when the activities has only 1 element
                    setSelectedItem(null);
                else setSelectedItem(activities[index]);
            }
        }

        return (
            <div className="flex flex-col flex-grow min-w-max">
                <ToolBar title="Activity" />
                <div className="grid grid-cols-3 gap-6 flex-grow p-6 overflow-auto bg-gray-200 rounded-br-2xl">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4">{name}</h1>
                        <p>ID: {selectedItem.id}</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="mgt-name">Activity Name*</label>
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
                        <label htmlFor="days">Days</label>
                        <select
                            id="days"
                            value={daysOfWeek}
                            onChange={(e) => setDaysOfWeek(e.target.value)}
                            className=" twinput"
                        >
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
                        <div className="grid grid-cols-2 space-x-6 mt-2 mb-6">
                            <label htmlFor="include-yoga">Include Yoga</label>
                            <input
                                type="checkbox"
                                id="include-yoga"
                                checked={includeYoga}
                                onChange={(e) => setYoga(e.target.checked)}
                                className="twcheck"
                            />
                        </div>
                        <div className="grid grid-cols-2 space-x-6 mt-2 mb-6">
                            <label htmlFor="include-dinner">
                                Include Dinner
                            </label>
                            <input
                                type="checkbox"
                                id="include-dinner"
                                checked={includeDinner}
                                onChange={(e) => setDinner(e.target.checked)}
                                className="twcheck"
                            />
                        </div>
                        <div className="flex justify-evenly mt-6">
                            <button
                                onClick={updateData}
                                className="twbtn text-white bg-slate-400 rounded hover:bg-slate-500"
                            >
                                Update
                            </button>
                            <button
                                onClick={deleteData}
                                className="twbtn text-white bg-red-400 rounded hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {/* <div className="min-w-0 flex-grow bg-blue-200">3</div> */}
                </div>
            </div>
        );
    }

    return loading ? (
        <p>Loading</p>
    ) : (
        <>
            <ItemList
                type={"activity"}
                items={activities}
                setItem={setActivity}
                setSelectedItem={setSelectedItem}
            />
            <UpdateActivity />
        </>
    );
}

export default Activity;
