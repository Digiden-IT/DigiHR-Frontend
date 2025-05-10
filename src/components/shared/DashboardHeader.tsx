import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { RxExit } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { AiOutlineUser } from "react-icons/ai";

const { Header } = Layout;
const DashboardHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          to={`/${user?.role?.toLowerCase()}/my-profile`}
          className="flex items-center gap-2"
        >
          <AiOutlineUser size={18} /> Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <p onClick={handleLogout} className="flex items-center gap-2 w-28">
          <RxExit size={14} className="mx-[3px]" /> Logout
        </p>
      ),
    },
  ];

  return (
    <Header className="bg-white sticky top-0 z-10 flex gap-3 justify-end items-center h-14 px-10 shadow">
      <Dropdown trigger={["click"]} menu={{ items }} placement="bottomRight">
        <Avatar
          size={"default"}
          src="https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
          className="cursor-pointer"
        />
      </Dropdown>
    </Header>
  );
};

export default DashboardHeader;
