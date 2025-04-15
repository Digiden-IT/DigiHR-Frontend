import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import AddNewEmployeeModal from "../../../../components/modals/AddNewEmployeeModal";

import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../../../../redux/feature/userApi/userApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { EmployeeManagementDataType } from "../../../../types/props.type";
const { Column } = Table;

const EmployeeManagement = () => {
  const { data: usersData, isLoading } = useGetAllUserQuery(undefined);
  // todo: make action according to loading and remove console
  console.log(isLoading, usersData?.data);

  const user = useSelector(selectCurrentUser);

  // todo: make action according to loading and remove console
  console.log(isLoading, usersData?.data);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (key: React.Key) => {
    console.log("delete data: ", key);
  };

  return (
    <div className="p-6 min-h-screen">
      <Space className="mb-4 flex justify-between">
        <div>
          <button
            className="btn-1 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() => showModal()}
          >
            + Add Employee
          </button>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by Date"
            className="w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button className="rounded-md">
            <VscSettings size={20} />
            Filter
          </Button>
        </div>
      </Space>
      <Table<EmployeeManagementDataType>
        dataSource={usersData?.data}
        pagination={false}
        loading={isLoading}
      >
        <Column title="Employee Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Department" dataIndex="department" key="department" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="Joining Date"
          dataIndex="dateOfJoining"
          key="dateOfJoining"
        />
        <Column
          title="Action"
          key="Action"
          render={(_, record: EmployeeManagementDataType) => (
            <Space size="middle">
              <Link
                to={`/${user?.role.toLowerCase()}/employee-management/user-details/${
                  record.key
                }`}
              >
                <PiEye size={20} />
              </Link>

              <CiTrash
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(record.key)}
              />
            </Space>
          )}
        />
      </Table>

      <AddNewEmployeeModal visible={isModalOpen} onCancel={closeModal} />
    </div>
  );
};

export default EmployeeManagement;
