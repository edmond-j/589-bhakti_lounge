import { Outlet } from "react-router-dom";
import { Bounce, Slide, Zoom, Flip, ToastContainer } from "react-toastify";
import React from "react";

function ChkLayout() {
    return (
        <div className="chk-body bg-gray-500">
            <div className="chk-root text-gray-700">
                <Outlet />
                <div className="mt-28">
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1500}
                        transition={Zoom}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChkLayout;
