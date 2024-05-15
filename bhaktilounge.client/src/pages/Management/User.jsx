import React from "react";
import ToolBar from "../../components/management/ToolBar";

function User() {
    return (
        <div className="flex-grow bg-gray-200">
            <ToolBar title="User" />
            <div className="flex flex-col mx-12">
                <div className="grid grid-cols-2 pt-6 min-w-max">
                    <div className="min-w-max">
                        <label className="text-nowrap self-center" htmlFor="">
                            User Name
                        </label>
                        <input className="tw-input" type="text" />
                    </div>

                    <div className="min-w-max">
                        <label className="text-nowrap self-center" htmlFor="">
                            Password
                        </label>
                        <input className="tw-input" type="text" />
                    </div>

                    <div className="min-w-max">
                        <label className="text-nowrap self-center" htmlFor="">
                            Type
                        </label>
                        <input className="tw-input" type="text" />
                    </div>

                    <div className="min-w-max">
                        <label className="text-nowrap self-center" htmlFor="">
                            Confirm Password
                        </label>
                        <input className="tw-input" type="text" />
                    </div>
                </div>
                <div className="flex">
                    <button className="tw-btn">Add</button>
                </div>
            </div>
            <hr className="border border-gray-900 mx-12 my-6" />

            {/* Table */}
            <div className="mx-12">
                <p className=" text-lg font-bold px-6 mb-2">Existing Users</p>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    XXX
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    XXX
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Vira
                                </th>
                                <td className="px-6 py-4">Administrator</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">$2999</td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href="#"
                                        className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User;
