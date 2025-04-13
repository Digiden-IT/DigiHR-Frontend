import { createBrowserRouter, Link } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import RedirectToRoleBasedDashboard from "../layouts/RedirectToRoleBasedDashboard";
import { userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToRoleBasedDashboard />,
    errorElement: (
      <p>
        Page not found back to <Link to={"/"}>Home</Link>
      </p>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths, "admin"),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="USER">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths, "user"),
  },
]);

export default router;
