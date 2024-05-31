import React from "react";

import ToolBar from "../../components/management/ToolBar";
import { useState, useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import UserSignupPanel from "@/components/management/UserSignupPanel.jsx";
import authFetch from "@/utils/authFetch.js";

function User() {
    const [users, setUsers] = useState([]);
    async function populateData() {
        authFetch(`/api/v1/Auth/user-list`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            });
    }
    useEffect(() => {
        populateData();
        console.log(users);
    }, []);

    function deleteUser(userToDel) {
        const option = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: userToDel.name,
            }),
        };
        authFetch(`/api/v1/Auth/delete`, option).then((response) => {
            if (response.ok) {
                console.log(response);
                toast.success(userToDel.name + " has been deleted.");
                //在列表中删除
                setUsers((currentUsers) => currentUsers.filter((user) => user !== userToDel));
            }
        });
    }

    return (
        <div className="flex-grow bg-gray-200 rounded-r-2xl">
            <ToolBar title="User" />
            <UserSignupPanel populateData={populateData}/>
            {/* <hr className="border border-gray-400 mx-12 my-6" /> */}
            <hr className=" mx-12 my-6" />

            {/* Table */}
            <div className="mx-12">
                <p className=" text-lg font-bold mb-2">Existing Users</p>
                <div className="relative overflow-x-auto drop-shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {/* <span className="sr-only">Edit</span> */}
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4">{user.id.slice(0, 8)} </td>
                                        <td className="px-6 ">
                                            <button className="rounded-3xl p-2 hover:bg-gray-200" onClick={() => deleteUser(user)}>
                                                <MdOutlineDeleteForever className="w-6 h-6 text-link" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User;
