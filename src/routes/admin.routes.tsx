import HomeDashboard from "../pages/dashboard/admin/home/HomeDashboard";
import { LuLayoutDashboard } from "react-icons/lu";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LuLayoutDashboard size={18} />,
    element: <HomeDashboard />,
  },
];
