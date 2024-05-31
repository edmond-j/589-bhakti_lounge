import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaSortAmountDown } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import authFetch from '@/utils/authFetch.js';

function ItemList({ type, items, setItem, setSelectedItem }) {
    function createNew() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        };
        authFetch(`/api/v1/${type}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log('New Activity Created:', data);
                // refreshData().then(() => {
                // });
                setItem((prevItems) => [...prevItems, data]);
                setSelectedItem(data); // Ensure refreshData() is complete
            })
            .catch((error) => console.error('Error:', error));
        // onAdd(newData);
    }

    function sortByName() {
        // const box=document.getElementById("sortButtonBox")
        // box.style="display:none"
        const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
        setItem(sortedItems);
        setSelectedItem(sortedItems[0]);
    }

    function sortByID() {
        const sortedItems = items.sort((a, b) => a.id - b.id);
        setItem(sortedItems);
        setSelectedItem(sortedItems[0]);
    }

    return (
        <div className="flex flex-col w-64 min-w-64 border-r border-gray-300 bg-white">
            <button className="relative text-sm focus:outline-none group">
                <div className="flex items-center justify-between w-full h-16 px-4 border-b border-gray-300 hover:bg-gray-300">
                    <FaSortAmountDown className="w-5 h-5" />
                    <span className="font-bold">Sort By</span>
                    <MdOutlineKeyboardArrowDown className="w-5 h-5" />
                </div>
                <div id="sortButtonBox" className="absolute z-10 flex-col items-start hidden w-full pb-1 bg-white shadow-lg group-focus:flex">
                    <a className="w-full px-4 py-2 text-left hover:bg-gray-300" onClick={sortByName}>
                        by Name
                    </a>
                    <a className="w-full px-4 py-2 text-left hover:bg-gray-300" onClick={sortByID}>
                        by Created Time
                    </a>
                </div>
            </button>
            <div className="flex flex-col flex-grow p-4">
                <div className="flex flex-col max-h-95 overflow-y-auto overflow-x-hidden">
                    {items.length > 0 ? (
                        <ul id="mgmt-itemlist">
                            {items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <li
                                        className="flex items-center flex-shrink-0 h-9 px-4 my-1 text-sm font-medium rounded-lg text-nowrap hover:bg-gray-300"
                                        id={`item-${item.id}`}
                                        tabIndex="0"
                                        onClick={() => setSelectedItem(item)}>
                                        {item.name}
                                    </li>
                                    <hr />
                                </React.Fragment>
                            ))}
                        </ul>
                    ) : (
                        <label className="self-center font-bold text-2xl text-gray-400 mt-40">(Empty)</label>
                    )}
                </div>
                <button className="tw-btn flex flex-shrink-0 mt-auto rounded" onClick={createNew}>
                    <IoMdAdd className="w-5 h-5 mr-2" />
                    Add New
                </button>
            </div>
        </div>
    );
}

export default ItemList;
