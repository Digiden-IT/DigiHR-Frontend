import { RxPerson } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import EmployeeDetails from "../pages/dashboard/admin/employee-management/EmployeeDetails";
import LeaveManagement from "../pages/dashboard/admin/leave-management/LeaveManagement";
import HomeDashboard from "../pages/dashboard/admin/home/HomeDashboard";
import EmployeeManagement from "../pages/dashboard/admin/employee-management/EmployeeManagement";
import Announcements from "../pages/dashboard/admin/announcements/Announcements";
import HolidayManagement from "../pages/dashboard/admin/holiday-management/HolidayManagement";
import LeaveCountSetting from "../pages/dashboard/admin/leave-count-setting/LeaveCountSetting"

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
    element: <EmployeeDetails/>,
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
    name: "Holiday Management",
    path: "/holiday-management",
    icon: <FaRegCalendarAlt size={18} />,
    element: <HolidayManagement />,
  },
  {
    name: "Announcements",
    path: "/announcements",
    icon: <GrAnnounce size={18} />,
    element: <Announcements />,
    show: true,
  },
  {
    name: "Leave Count Setting",
    path: "/leave-count-setting",
    icon: <FaClockRotateLeft size={18} />,
    element: <LeaveCountSetting />,
    show: true,
  },
];
