import { Outlet } from "react-router-dom";
import MgmtHeader from "../components/management/MgmtHeader.jsx";

import "./Management.css";
function Management() {
  return (
    <>
      <MgmtHeader />
      <Outlet />
    </>
  );
}
export default Management;
