import React, { useState } from "react";
import { Space, Table, Button } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";

import { BsFilterLeft } from "react-icons/bs";

import AddNewEmployeeModal from "../../../../components/modals/AddNewEmployeeModal";
import { Link } from "react-router-dom";

const { Column } = Table;

interface DataType {
  key: React.Key;
  EmployeeName: string;
  Email: string;
  Department: string;
  Role: string;
  JoiningDate: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    EmployeeName: "Aktaruzzaman",
    Email: "opu@gmail.com",
    Department: "Frontend",
    Role: "Employee",
    JoiningDate: "01/01/2024",
  },
  {
    key: "2",
    EmployeeName: "osman",
    Email: "antor@gmail.com",
    Department: "Frontend",
    Role: "Intern",
    JoiningDate: "08/02/2024",
  },
  {
    key: "3",
    EmployeeName: "fahim",
    Email: "fahim@gmail.com",
    Department: "Frontend",
    Role: "Employee",
    JoiningDate: "01/01/2025",
  },
  {
    key: "4",
    EmployeeName: "Rahat",
    Email: "Rahat@gmail.com",
    Department: "backend",
    Role: "Intern",
    JoiningDate: "08/02/2025",
  },
  {
    key: "5",
    EmployeeName: "Nahid",
    Email: "Nahid@gmail.com",
    Department: "Manager",
    Role: "CTO",
    JoiningDate: "01/01/2024",
  },
  {
    key: "6",
    EmployeeName: "Javed",
    Email: "Javed@gmail.com",
    Department: "Manager",
    Role: "CEO",
    JoiningDate: "01/01/2025",
  },
];

const EmployeeManagement = () => {
  const [data, setData] = useState<DataType[]>(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (key: React.Key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  return (
    <>
      <Space className="mb-4 flex justify-between">
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
            onClick={() => showModal()}
          >
            + Add Employee
          </button>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by Date"
            className="w-full px-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button>
            <BsFilterLeft size={20} />
            Filter
          </Button>
        </div>
      </Space>
      <Table<DataType> dataSource={data} pagination={{ pageSize: 5 }}>
        <Column
          title="Employee Name"
          dataIndex="EmployeeName"
          key="EmployeeName"
        />
        <Column title="Email" dataIndex="Email" key="Email" />
        <Column title="Department" dataIndex="Department" key="Department" />
        <Column title="Role" dataIndex="Role" key="Role" />
        <Column
          title="Joining Date"
          dataIndex="JoiningDate"
          key="JoiningDate"
        />
        <Column
          title="Action"
          key="Action"
          render={(_, record: DataType) => (
            <Space size="middle">
              <Link
                to={`/admin/employee-management/user-details/${record.key}`}
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
    </>
  );
};

export default EmployeeManagement;
