import { Outlet } from "react-router-dom";
import { Bounce, Slide, Zoom, Flip, ToastContainer } from "react-toastify";
import MgmtHeader from "../components/management/MgmtHeader.jsx";
import MgmtSideBar from "../components/management/MgmtSideBar.jsx";
import "react-toastify/dist/ReactToastify.css";
import "/public/style.css";
// import "./Management.css"

function Management() {
    return (
        <div className="flex justify-center w-screen bg-gray-500 min-h-screen">
            <div className="flex w-3/4 min-h-full text-gray-700">
                {/* <MgmtHeader /> */}
                <MgmtSideBar />
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
export default Management;