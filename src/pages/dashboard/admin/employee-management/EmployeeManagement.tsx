import React, { useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import AddNewEmployeeModal from "../../../../components/modals/AddNewEmployeeModal";

import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../../../../redux/feature/userApi/userApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";

const { Column } = Table;

interface DataType {
  key: React.Key;
  EmployeeName: string;
  Email: string;
  Department: string;
  Role: string;
  JoiningDate: string;
}

const EmployeeManagement = () => {
  const { data: usersData, isLoading } = useGetAllUserQuery(undefined);
  // todo: make action according to loading and remove console
  console.log(isLoading, usersData?.data);

  const user = useSelector(selectCurrentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (key: React.Key) => {
    console.log("delete data: ", key);
  };

  return (
    <div className="p-6 min-h-screen">
      <Space className="mb-4 flex justify-between">
        <div>
          <button
            className="btn-1 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={showModal}
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
      <Table<DataType> dataSource={usersData?.data} pagination={false}>
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
          render={(_, record: DataType) => (
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
      <Modal
        title="Add New Employee"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        width="70%"
        footer={null}
        closable={false}
      >
        <AddNewEmployeeModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
