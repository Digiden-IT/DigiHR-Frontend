import { Link } from 'react-router-dom';
import { TSidebarItem, TUserPath } from '../types/sidebar.type';

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.show === false) return acc;

    const fullPath = '/' + role + item?.path;

    if (item.path && item.name) {
      acc.push({
        key: fullPath, // use full path as key
        icon: item?.icon,
        label: <Link to={fullPath}>{item?.name}</Link>,
      });
    }

    if (item.children && item.name) {
      acc.push({
        key: item.name, // for submenu grouping
        label: item.name,
        icon: item.icon,
        children: item.children.map((child) => {
          const childPath = '/' + role + child?.path;
          return {
            key: childPath, // use full child path as key
            icon: child?.icon,
            label: <Link to={childPath}>{child?.name}</Link>,
          };
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
