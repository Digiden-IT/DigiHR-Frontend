import { RxPerson } from "react-icons/rx";
import HomeDashboard from "../pages/dashboard/admin/home/HomeDashboard";
import { LuLayoutDashboard } from "react-icons/lu";
import EmployeeManagement from "../pages/dashboard/admin/employee-management/EmployeeManagement";
import Announcements from "../pages/dashboard/admin/announcements/Announcements";
import { GrAnnounce } from "react-icons/gr";

import EmployeeDetails from "../pages/dashboard/admin/employee-management/EmployeeDetails";
import LeaveManagement from "../pages/dashboard/admin/leave-management.tsx/LeaveManagement";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={18} />,
    element: <HomeDashboard />,
    show: true,
  },
  {
    name: "Employee Management",
    path: "/employee-management",
    icon: <RxPerson size={18} />,
    element: <EmployeeManagement />,
    show: true,
  },
  {
    name: "SingleEmployeeDetails",
    path: "/employee-management/user-details/:userId",
    icon: <LuLayoutDashboard size={18} />,
    element: <EmployeeDetails />,
    show: false,
  },
  {
    name: "Leave Management",
    path: "/leave-management",
    icon: <RxPerson size={18} />,
    element: <LeaveManagement />,
    show: true,
  },
  {
    name: "Announcements",
    path: "/announcements",
    icon: <GrAnnounce size={18} />,
    element: <Announcements />,
    show: true,
  },
];
