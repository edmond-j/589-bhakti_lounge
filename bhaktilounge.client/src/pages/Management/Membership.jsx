import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ItemList from "/src/components/management/ItemList";
import ToolBar from "../../components/management/ToolBar";
import OptionButton from "../../components/management/OptionButton";
import { itemHighlight } from "./method";
import spinner from "/public/spinner.svg";

function Membership() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function populateActivityData() {
            fetch("/api/v1/memberclass")
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
                setDuration(selectedItem.duration);
                setPass(selectedItem.pass);
                setPrice(selectedItem.price);
            }, [selectedItem]);
            const [name, setName] = useState(selectedItem.name);
            const [duration, setDuration] = useState(selectedItem.duration);
            const [pass, setPass] = useState(selectedItem.pass);
            const [price, setPrice] = useState(selectedItem.price);

            function updateData() {
                let newData = {
                    id: selectedItem.id,
                    name,
                    duration,
                    pass,
                    price,
                };

                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newData),
                };
                fetch("/api/v1/memberclass", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Update Succesful:", data);
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
                const url = "/api/v1/memberclass?Id=" + selectedItem.id;
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
                    else setSelectedItem(items[1]);
                }
            }
            content = (
                <div className="flex grow p-6 bg-gray-200 rounded-br-2xl">
                    <div className="w-64">
                        <h1 className="text-4xl font-extrabold mb-4 overflow-hidden">{name}</h1>
                        <p>ID: {selectedItem.id}</p>
                    </div>
                    <div className="w-64 flex-col">
                        <label htmlFor="mgt-name">Membership Name*</label>
                        <input  
                            type="text"
                            id="mgt-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className=" tw-input"
                            maxLength="30"
                        />
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration || 0}
                            onChange={(e) => setDuration(e.target.value)}
                            className=" tw-input"
                            min="0"
                        />
                        <label htmlFor="pass">Pass</label>
                        <input
                            type="number"
                            id="pass"
                            value={pass || 0}
                            onChange={(e) => setPass(e.target.value)}
                            className=" tw-input"
                            min="0"
                        />
                        <label htmlFor="price">Price (NZD)*</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className=" tw-input"
                            min="0"
                        />
                        <OptionButton
                            updateData={updateData}
                            deleteData={deleteData}
                        />
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
            <ItemList
                type={"memberclass"}
                items={items}
                setItem={setItems}
                setSelectedItem={setSelectedItem}
            />
            <UpdateItemForm />
        </>
    );
}

export default Membership;
