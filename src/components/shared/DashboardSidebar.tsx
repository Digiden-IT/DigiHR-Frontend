import { Layout, Menu, MenuProps } from "antd";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";
import { PiUsersFourBold } from "react-icons/pi";
import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import logo from "../../../public/Logo.png";
import { TUser, userRole } from "../../types/user.type";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";

const { Sider } = Layout;

const DashboardSidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = jwtDecode(token);
  }

  let sidebarItems: MenuProps["items"];

  switch ((user as TUser)!.userRole) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(
        adminPaths,
        userRole.ADMIN
      ) as MenuProps["items"];
      break;
    case userRole.USER:
      sidebarItems = [
        {
          key: "manage-users",
          icon: <PiUsersFourBold size={18} />,
          label: <p>Employee Management</p>,
        },
      ];
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={55}
      collapsible
      width={220}
      theme="light"
      className="h-screen sticky top-0 left-0 bg-four"
    >
      <div className="h-[4rem] flex justify-center items-center text-gray-50 mb-5">
        <img src={logo} className="w-28" />
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
