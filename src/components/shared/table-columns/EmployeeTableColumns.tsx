import { TableColumnsType, Space } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { EmployeeManagementDataType } from "../../../types/props.type";

export const EmployeeTableColumns = (
  currentUserRole: string | undefined,
  handleOpenDeleteModal: (id: number) => void
): TableColumnsType<EmployeeManagementDataType> => {

  const commonColumns: TableColumnsType<EmployeeManagementDataType> = [
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
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
  ];

  if (currentUserRole?.toLowerCase() === "admin") {
    commonColumns.push({
      title: "Action",
      key: "action",
      render: (_, record: EmployeeManagementDataType) => (
        <Space size="middle">
          <Link
            to={`/${currentUserRole?.toLowerCase()}/employee-management/user-details/${
              record.id
            }`}
          >
            <PiEye
              size={20}
              className="text-blue-500 hover:text-blue-700 border-none shadow-none"
            />
          </Link>

          <CiTrash
            size={20}
            className="text-red-500 hover:text-red-700 border-none shadow-none"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenDeleteModal(record.id)}
          />
        </Space>
      ),
    });
  }

  return commonColumns;
};

export default EmployeeTableColumns;
