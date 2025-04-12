import { createBrowserRouter, Link } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../layouts/ProtectedRoute";
import { routeGenerator } from "../utils/routeGenerator";
import { userRole } from "../types/user.type";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
      <ProtectedRoute role="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths, userRole.ADMIN),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths, userRole.USER),
  },
]);

export default router;
