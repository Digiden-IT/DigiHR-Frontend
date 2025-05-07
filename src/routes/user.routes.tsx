import HomeDashboard from "../pages/dashboard/user/dashboard/HomeDashboard";
import { LuLayoutDashboard } from "react-icons/lu";
import ViewEmployees from "../pages/dashboard/user/view-employees/ViewEmployees";
import { RxPerson } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import LeaveScheduler from "../pages/dashboard/user/leave-scheduler/LeaveScheduler";
import SingleEmployee from "../pages/dashboard/admin/employee-management/SingleEmployee";

export const userPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={18} />,
    element: <HomeDashboard />,
    show: true,
  },
  {
    name: "Leave Management",
    path: "/leave-management",
    icon: <FaPersonWalkingDashedLineArrowRight size={20} />,
    element: <LeaveScheduler />,
    show: true,
  },
  {
    name: "View Employees",
    path: "/view-employees",
    icon: <FaUsers size={18} />,
    element: <ViewEmployees />,
    show: true,
  },
  {
    name: "My Profile",
    path: "/my-profile",
    icon: <RxPerson size={18} />,
    element: <SingleEmployee />,
    show: true,
  },
];
