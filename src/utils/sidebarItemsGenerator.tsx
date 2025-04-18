import { Link } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebar.type";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    // Skip if `show` is explicitly false
    if (item.show === false) return acc;

    // Render direct link items
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        icon: item?.icon,
        label: <Link to={`/${role}${item.path}`}>{item.name}</Link>,
      });
    }

    // Render items with children (filter out children where show is false)
    if (item.children && item.name) {
      const children = item.children
        .filter((child) => child.show !== false)
        .map((child) => ({
          key: child.name!,
          icon: child?.icon,
          label: <Link to={`/${role}${child?.path}`}>{child?.name}</Link>,
        }));

      if (children.length > 0) {
        acc.push({
          key: item.name,
          label: item.name,
          icon: item.icon,
          children,
        });
      }
    }

    return acc;
  }, []);

  return sidebarItems;
};
