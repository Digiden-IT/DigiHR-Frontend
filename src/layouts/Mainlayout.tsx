import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div className="background-gradient">
      <Outlet />
    </div>
  );
};

export default Mainlayout;
