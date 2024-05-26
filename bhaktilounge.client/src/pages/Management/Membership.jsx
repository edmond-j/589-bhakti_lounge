import React from "react";
import { useEffect, useState } from "react";
import ItemList from "/src/components/management/ItemList";
import ToolBar from "../../components/management/ToolBar";
import OptionButton from "../../components/management/OptionButton";
import { itemHighlight, updateData, deleteData } from "./method";
import spinner from "/spinner.svg";
import authFetch from "@/utils/authFetch.js";

function Membership() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setLoading] = useState(true);

    async function populateData() {
        authFetch("/api/v1/memberclass")
            .then((response) => response.json())
            .then((data) => {
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
                    <label className="font-bold text-4xl text-gray-400 mt-40" htmlFor="">
                        No Data
                    </label>
                </div>
            );
        } else {
            useEffect(() => {
                setName(selectedItem.name);
                setDuration(selectedItem.duration);
                setPass(selectedItem.pass);
                setPrice(selectedItem.price);
            }, [selectedItem]);
            const [name, setName] = useState(selectedItem.name);
            const [duration, setDuration] = useState(selectedItem.duration);
            const [pass, setPass] = useState(selectedItem.pass);
            const [price, setPrice] = useState(selectedItem.price);

            function handleUpdate() {
                let newData = {
                    id: selectedItem.id,
                    name,
                    duration: duration || 0,
                    pass: pass || 0,
                    price: price || 0,
                };
                console.log("memberclass", newData);
                updateData("memberclass", newData, items, setItems, setSelectedItem);
            }

            function handleDelete() {
                deleteData("memberclass", items, setItems, selectedItem, setSelectedItem, populateData);
            }

            content = (
                <div className="flex grow p-6 bg-gray-200 rounded-br-2xl">
                    <div className="w-64">
                        <h2 className=" mb-4 overflow-hidden">{name}</h2>
                        <p>ID: {selectedItem.id}</p>
                    </div>
                    <div className="w-64 flex-col">
                        <label htmlFor="mgt-name">Membership Name*</label>
                        <input type="text" id="mgt-name" value={name} onChange={(e) => setName(e.target.value)} className=" tw-input" maxLength="30" />
                        <label htmlFor="duration">Duration</label>
                        <input type="number" id="duration" value={duration || 0} onChange={(e) => setDuration(e.target.value)} className=" tw-input" min="0" />
                        <label htmlFor="pass">Pass</label>
                        <input type="number" id="pass" value={pass || 0} onChange={(e) => setPass(e.target.value)} className=" tw-input" min="0" />
                        <label htmlFor="price">Price (NZD)*</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className=" tw-input" min="0" />
                        <OptionButton updateData={handleUpdate} deleteData={handleDelete} />
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col w-192">
                <ToolBar title="Membership" />
                {content}
            </div>
        );
    }

    return (
        <>
            <ItemList type={"memberclass"} items={items} setItem={setItems} setSelectedItem={setSelectedItem} />
            <UpdateItemForm />
        </>
    );
}

export default Membership;
