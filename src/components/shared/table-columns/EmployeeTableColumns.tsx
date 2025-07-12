import { TableColumnsType, Space } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { EmployeeFormValues } from "../../../types/props.type";

export const EmployeeTableColumns = (
  currentUserRole: string | undefined,
  handleOpenDeleteModal?: (id: number) => void
): TableColumnsType<EmployeeFormValues> => {
  const role = currentUserRole?.toLowerCase();

  const baseColumns: TableColumnsType<EmployeeFormValues> = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const userColumns: TableColumnsType<EmployeeFormValues> = [
    {
      title: "Mobile Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
  ];

  const adminColumns: TableColumnsType<EmployeeFormValues> = [
    {
      title: "Department",
      dataIndex: ["department", "name"],
      key: "department",
    },
    {
      title: "Role",
      dataIndex: ["role", "name"],
      key: "role",
    },
  ];

  const joiningDateColumn: TableColumnsType<EmployeeFormValues> = [
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
  ];

  const actionColumn: TableColumnsType<EmployeeFormValues> = [
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/${role}/employee-management/user-details/${record.id}`}>
            <PiEye
              size={20}
              className="text-blue-500 hover:text-blue-700 border-none shadow-none"
            />
          </Link>
          <CiTrash
            size={20}
            className="text-red-500 hover:text-red-700 border-none shadow-none"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenDeleteModal?.(record.id)}
          />
        </Space>
      ),
    },
  ];

  return [
    ...baseColumns,
    ...(role === "user" ? userColumns : []),
    ...(role === "admin" ? adminColumns : []),
    ...joiningDateColumn,
    ...(role === "admin" ? actionColumn : []),
  ];
};

export default EmployeeTableColumns;
