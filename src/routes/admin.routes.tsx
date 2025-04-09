import { RxPerson } from "react-icons/rx";
import HomeDashboard from "../pages/dashboard/admin/home/HomeDashboard";
import { LuLayoutDashboard } from "react-icons/lu";
import EmployeeManagement from "../pages/dashboard/admin/employee-management/EmployeeManagement";
import Announcements from "../pages/dashboard/admin/announcements/Announcements";
import { GrAnnounce } from "react-icons/gr";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={18} />,
    element: <HomeDashboard />,
  },
  {
    name: "Employee Management",
    path: "/employee-management",
    icon: <RxPerson size={18} />,
    element: <EmployeeManagement />,
  },
  {
    name: "Announcements",
    path: "/announcements",
    icon: <GrAnnounce size={18} />,
    element: <Announcements />,
  },

];
