import React, { useState } from "react";
import { Space, Table, Modal } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import EmployeeProfile from "./EmployeeProfile";
import NewEmployee from "./NewEmployee";

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
  const [selectedEmployee, setSelectedEmployee] = useState<DataType | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);

  const handleDelete = (key: React.Key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (user: DataType) => {
    setIsModalOpen(true);
    setSelectedEmployee(user);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
          onClick={() => setOpenResponsive(true)}
        >
          + Add Employee
        </button>
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
              <PiEye
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(record)}
              />
              <CiEdit size={20} style={{ cursor: "pointer" }} />
              <CiTrash
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(record.key)}
              />
              <Modal
                title="Employee Details"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {selectedEmployee && (
                  <EmployeeProfile user={selectedEmployee} />
                )}
              </Modal>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Add New Employee"
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <NewEmployee />
      </Modal>
    </>
  );
};

export default EmployeeManagement;
