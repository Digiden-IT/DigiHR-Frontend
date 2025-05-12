import { Layout, Menu, MenuProps } from "antd";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import logo_expanded from "../../../public/logo_expanded.png";
import logo_collapsed from "../../../public/logo_collapsed.png";
import { TUser, userRole } from "../../types/user.type";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

const DashboardSidebar = () => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  let user;

  if (token) {
    user = jwtDecode(token);
  }

  let sidebarItems: MenuProps["items"];

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(
        adminPaths,
        userRole.ADMIN.toLowerCase()
      ) as MenuProps["items"];
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(
        userPaths,
        userRole.USER.toLowerCase()
      ) as MenuProps["items"];
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={55}
      collapsible
      width={250}
      theme="light"
      className="h-screen sticky top-0 left-0 bg-[#60032a]"
      collapsed={collapsed}
      onCollapse={setCollapsed}
      onBreakpoint={(broken) => {
        setCollapsed(broken);
      }}
    >
      <div className="h-[3.5rem] flex justify-center items-center text-gray-50 mb-5 bg-white">
        <img
          src={collapsed ? logo_collapsed : logo_expanded}
          className={collapsed ? "w-8" : "w-40"}
          alt="logo"
        />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]} // sync with route
        items={sidebarItems}
        className="bg-[#60032a] "
        style={{
          color: "#F5F5F5", // ← Text color here
        }}
      />
    </Sider>
  );
};

export default DashboardSidebar;
