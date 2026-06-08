import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="app-layout container">
      <Outlet />
    </div>
  );
}

export default AppLayout;
