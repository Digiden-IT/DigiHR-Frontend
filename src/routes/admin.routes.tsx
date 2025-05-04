import { RxPerson } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import LeaveManagement from "../pages/dashboard/admin/leave-management/LeaveManagement";
import EmployeeManagement from "../pages/dashboard/admin/employee-management/EmployeeManagement";
import Announcements from "../pages/dashboard/admin/announcements/Announcements";
import HolidayManagement from "../pages/dashboard/admin/holiday-management/HolidayManagement";
import LeaveCountSetting from "../pages/dashboard/admin/leave-count-setting/LeaveCountSetting";
import SingleEmployee from "../pages/dashboard/admin/employee-management/SingleEmployee";

export const adminPaths = [
  {
    name: "Announcements",
    path: "/announcements",
    icon: <GrAnnounce size={18} />,
    element: <Announcements />,
    show: true,
  },
  {
    name: "Employee Management",
    path: "/employee-management",
    icon: <RxPerson size={18}/>,
    element: <EmployeeManagement />,
    show: true,
  },
  {
    name: "SingleEmployeeDetails",
    path: "/employee-management/user-details/:userId",
    icon: <LuLayoutDashboard size={18}/>,
    element: <SingleEmployee />,
    show: false,
  },
  {
    name: "Leave Management",
    path: "/leave-management",
    icon: (
      <FaPersonWalkingDashedLineArrowRight
        size={20}
        style={{ color: "white" }}
      />
    ),
    element: <LeaveManagement />,
    show: true,
  },
  {
    name: "Holiday Management",
    path: "/holiday-management",
    icon: <FaRegCalendarAlt size={18}/>,
    element: <HolidayManagement />,
  },

  {
    name: "Leave Count Setting",
    path: "/leave-count-setting",
    icon: <FaClockRotateLeft size={18}/>,
    element: <LeaveCountSetting />,
    show: true,
  },
];
