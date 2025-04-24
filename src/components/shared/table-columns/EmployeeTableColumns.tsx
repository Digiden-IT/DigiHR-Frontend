import { TableColumnsType, Space } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { EmployeeManagementDataType } from "../../../types/props.type";

export const EmployeeTableColumns = (
  currentUserRole: string | undefined,
  handleOpenDeleteModal?: (id: number) => void
): TableColumnsType<EmployeeManagementDataType> => {
  const role = currentUserRole?.toLowerCase();

  const baseColumns: TableColumnsType<EmployeeManagementDataType> = [
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

  const userColumns: TableColumnsType<EmployeeManagementDataType> = [
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
  ];

  const adminColumns: TableColumnsType<EmployeeManagementDataType> = [
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const joiningDateColumn: TableColumnsType<EmployeeManagementDataType> = [
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
  ];

  const actionColumn: TableColumnsType<EmployeeManagementDataType> = [
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
