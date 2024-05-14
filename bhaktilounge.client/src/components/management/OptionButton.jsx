import React from "react";

function OptionButton({ updateData, deleteData }) {
    return (
        <div className="flex justify-evenly mt-12">
            <button
                onClick={updateData}
                className="tw-btn  bg-slate-400 rounded hover:bg-slate-500 hover:text-white">
                Update
            </button>
            <button
                onClick={deleteData}
                className="tw-btn  bg-red-400 rounded hover:bg-red-500 hover:text-white">
                Delete
            </button>
        </div>
    );
}
    
export default OptionButton;
