import { Layout, Menu, MenuProps } from "antd";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";

import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import logo from "../../../public/Logo.png";
import { TUser, userRole } from "../../types/user.type";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";

const { Sider } = Layout;

const DashboardSidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = jwtDecode(token);
  }

  let sidebarItems: MenuProps["items"];

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(
        adminPaths,
        "admin"
      ) as MenuProps["items"];
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(
        userPaths,
        userRole.USER
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
      width={302}
      theme="light"
      className="h-screen sticky top-0 left-0 bg-four"
    >
      <div className="h-[4rem] flex justify-center items-center text-gray-50 mb-5">
        <img src={logo} className="w-40" />
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sidebarItems}
        className="bg-four"
      />
    </Sider>
  );
};

export default DashboardSidebar;
