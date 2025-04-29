import HomeDashboard from "../pages/dashboard/admin/home/HomeDashboard";
import { LuLayoutDashboard } from "react-icons/lu";
import ViewEmployees from "../pages/dashboard/user/view-employees/ViewEmployees";
import { RxPerson } from "react-icons/rx";
import { BsFilePerson } from "react-icons/bs";
import EmployeeDetails from "../pages/dashboard/admin/employee-management/EmployeeDetails";

export const userPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={18} />,
    element: <HomeDashboard />,
    show: true,
  },
  {
    name: "View Employees",
    path: "/view-employees",
    icon: <BsFilePerson size={18} />,
    element: <ViewEmployees />,
    show: true,
  },
  {
    name: "My Profile",
    path: "/my-profile",
    icon: <RxPerson size={18} />,
    element: <EmployeeDetails />,
    show: true,
  },
];
