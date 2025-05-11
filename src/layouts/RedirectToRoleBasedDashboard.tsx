import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utils/jwtDecode";

const RedirectToRoleBasedDashboard = () => {
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);

  const user = token ? verifyToken(token) : null;

  useEffect(() => {
    if (user?.role) {
      const role = user?.role.toLowerCase();
      if (role === "admin") {
        navigate("/admin/announcements", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return null;
};

export default RedirectToRoleBasedDashboard;
