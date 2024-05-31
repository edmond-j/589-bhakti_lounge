import { Outlet } from "react-router-dom";
import { Bounce, Slide, Zoom, Flip, ToastContainer } from "react-toastify";
import MgmtSideBar from "../components/management/MgmtSideBar.jsx";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@/ProtectedRoute.jsx";
import ProtectedRoute from "@/ProtectedRoute.jsx";

function MgmtLayout() {
    return (
        <div className="flex justify-center p-8 min-h-screen bg-gray-500">
            <div className="flex overflow-auto w-320 min-h-full text-gray-700">
                {/* <MgmtHeader /> */}
                <MgmtSideBar />
                {/*<ProtectedRoute>*/}
                    <Outlet />
                {/*</ProtectedRoute>*/}
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
export default MgmtLayout;
