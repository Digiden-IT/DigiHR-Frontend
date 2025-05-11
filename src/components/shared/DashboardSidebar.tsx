import React, { isValidElement, ReactElement } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { jwtDecode } from "jwt-decode";
import logo from "../../../public/Logo.png";
import { TUser, userRole } from "../../types/user.type";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { useLocation } from "react-router-dom";

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

  const findActiveMenuKey = (
    items: MenuProps["items"] | undefined,
    pathname: string
  ): string | undefined => {
    for (const item of items || []) {
      if (!item) continue;

      if ("key" in item && "label" in item) {
        const { label } = item;
        if (isValidElement(label)) {
          const element = label as ReactElement<{ to: string }>;
          if (element.props.to === pathname) {
            return item.key as string;
          }
        }
      }

      if ("children" in item && Array.isArray(item.children)) {
        for (const child of item.children) {
          if (!child) continue;

          if ("label" in child && "key" in child) {
            const { label } = child;
            if (isValidElement(label)) {
              const element = label as ReactElement<{ to: string }>;
              if (element.props.to === pathname) {
                return child.key as string;
              }
            }
          }
        }
      }
    }

    return undefined;
  };

  const location = useLocation();
  console.log("Location:", location.pathname); // Log the current pathname
  console.log("Sidebar Items:", sidebarItems); // Log the sidebar items
  const selectedKey = findActiveMenuKey(sidebarItems, location.pathname);
  console.log("Selected Menu Key:", selectedKey);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={55}
      collapsible
      width={250}
      theme="light"
      className="h-screen sticky top-0 left-0 bg-[#60032a]"
    >
      <div className="h-[4rem] flex justify-center items-center text-gray-50 mb-5 bg-white">
        <img src={logo} className="w-40" />
      </div>

      <Menu
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
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
