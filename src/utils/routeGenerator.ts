import { TRoute, TUserPath } from "../types/sidebar.type";

export const routeGenerator = (items: TUserPath[], role: string) => {
  console.log(role);
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: "/" + role + item?.path,
        element: item?.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: "/" + role + child?.path,
          element: child?.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
