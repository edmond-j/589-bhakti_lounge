import { Outlet } from "react-router-dom";
import MgtHeader from "../components/management/MgtHeader";
function MgmtLayout() {
  return (
    <>
      <MgtHeader />
      <Outlet />
    </>
  );
}
export default MgmtLayout;
