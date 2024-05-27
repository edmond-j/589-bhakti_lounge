import React from "react";
import { useEffect, useState } from "react";
import ItemList from "/src/components/management/ItemList";
import ToolBar from "../../components/management/ToolBar";
import WeekDayMultiSelect from "../../components/management/WeekDayMultiSelect";
import OptionButton from "../../components/management/OptionButton";
import { itemHighlight, updateData, deleteData } from "./method";
import spinner from "/spinner.svg";
import authFetch from "@/utils/authFetch.js";

function Activity() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setLoading] = useState(true);

    async function populateData() {
        // const response = await fetch("/api/v1/activity");
        // const data = await response.json();
        // setActivity(data);
        //设定selectedItem
        authFetch("/api/v1/activity")
            .then((response) => response.json())
            .then((data) => {
                //如果没有data该怎么办？
                setLoading(false);
                if (data.length > 0) {
                    setItems(data);
                    setSelectedItem(data[0]);
                }
            });
    }

    useEffect(() => {
        populateData();
    }, []);

    useEffect(() => itemHighlight(selectedItem), [selectedItem]);

    function UpdateActivity() {
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
                    <label className="font-bold text-4xl text-gray-400 mt-40" htmlFor="">
                        No Data
                    </label>
                </div>
            );
        } else {
            useEffect(() => {
                //导致问题：Internal React error: Expected static flag was missing.
                setName(selectedItem.name);
                setPrice(selectedItem.price);
                setStartTime(selectedItem.startTime);
                setEndTime(selectedItem.endTime);
                setDaysOfWeek(selectedItem.daysOfWeek);
                setYoga(selectedItem.includeYoga);
                setDinner(selectedItem.includeDinner);
                console.log(selectedItem.daysOfWeek);
            }, [selectedItem]);
            const [name, setName] = useState(selectedItem.name);
            const [price, setPrice] = useState(selectedItem.price);
            const [startTime, setStartTime] = useState(selectedItem.startTime);
            const [endTime, setEndTime] = useState(selectedItem.endTime);
            const [daysOfWeek, setDaysOfWeek] = useState(selectedItem.daysOfWeek);
            const [includeYoga, setYoga] = useState(selectedItem.includeYoga || false);
            const [includeDinner, setDinner] = useState(selectedItem.includeDinner || false);

            function handleUpdate() {
                let newData = {
                    id: selectedItem.id,
                    name, // name:name,
                    price: price || 0,
                    startTime,
                    endTime,
                    daysOfWeek,
                    includeYoga,
                    includeDinner,
                };
                updateData("activity", newData, items, setItems, setSelectedItem);
            }

            function handleDelete() {
                deleteData("activity", items, setItems, selectedItem, setSelectedItem, populateData);
            }

            content = (
                <div className="flex grow p-6 bg-gray-200 rounded-br-2xl">
                    <div className="w-64">
                        <h2 className=" mb-4 overflow-hidden">{name}</h2>
                        <p>ID: {selectedItem.id}</p>
                    </div>
                    <div className="w-64 flex-col">
                        <label htmlFor="mgt-name">Activity Name*</label>
                        <input type="text" id="mgt-name" value={name} onChange={(e) => setName(e.target.value)} className="tw-input" maxLength="30" />
                        <label htmlFor="price">Price (NZD)*</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="tw-input" />
                        <label htmlFor="days">Days</label>
                        <WeekDayMultiSelect daysOfWeek={daysOfWeek} setDaysOfWeek={setDaysOfWeek} />
                        <label htmlFor="start-time">Start Time</label>
                        <input type="time" id="start-time" value={startTime || "00:00"} onChange={(e) => setStartTime(e.target.value)} className="tw-input" />
                        <label htmlFor="end-time">End Time</label>
                        <input type="time" id="end-time" value={endTime || "00:00"} onChange={(e) => setEndTime(e.target.value)} className="tw-input" />
                        <div className="grid grid-cols-2 space-x-6 mt-2 mb-6">
                            <label htmlFor="include-yoga">Include Yoga</label>
                            <input type="checkbox" id="include-yoga" checked={includeYoga} onChange={(e) => setYoga(e.target.checked)} className="tw-check" />
                        </div>
                        <div className="grid grid-cols-2 space-x-6 mt-2 mb-6">
                            <label htmlFor="include-dinner">Include Dinner</label>
                            <input type="checkbox" id="include-dinner" checked={includeDinner} onChange={(e) => setDinner(e.target.checked)} className="tw-check" />
                        </div>
                        <OptionButton updateData={handleUpdate} deleteData={handleDelete} />
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col w-192">
                <ToolBar title="Activity" />
                {content}
            </div>
        );
    }

    return (
        <>
            <ItemList type={"activity"} items={items} setItem={setItems} setSelectedItem={setSelectedItem} />
            <UpdateActivity />
        </>
    );
}

export default Activity;
