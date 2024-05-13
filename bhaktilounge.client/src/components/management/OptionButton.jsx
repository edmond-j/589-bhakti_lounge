import React from "react";

function OptionButton({ updateData, deleteData }) {
    return (
        <div className="flex justify-evenly mt-6">
            <button
                onClick={updateData}
                className="tw-btn text-white bg-slate-400 rounded hover:bg-slate-500">
                Update
            </button>
            <button
                onClick={deleteData}
                className="tw-btn text-white bg-red-400 rounded hover:bg-red-500">
                Delete
            </button>
        </div>
    );
}

export default OptionButton;
