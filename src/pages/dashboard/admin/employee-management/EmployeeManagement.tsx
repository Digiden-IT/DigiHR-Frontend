import React, { useState } from 'react';
import { Space, Table, Modal } from 'antd';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
// import UserDetails from './UserDetails';
import EmployeeProfile from './EmployeeProfile';

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
    key: '1',
    EmployeeName: 'Aktaruzzaman',
    Email: 'opu@gmail.com',
    Department: 'Frontend',
    Role: 'Employee',
    JoiningDate: '01/01/2024',
  },
  {
    key: '2',
    EmployeeName: 'osman',
    Email: 'antor@gmail.com',
    Department: 'Frontend',
    Role: 'Intern',
    JoiningDate: '08/02/2024',
  },
  {
    key: '3',
    EmployeeName: 'fahim',
    Email: 'fahim@gmail.com',
    Department: 'Frontend',
    Role: 'Employee',
    JoiningDate: '01/01/2025',
  },
  {
    key: '4',
    EmployeeName: 'Rahat',
    Email: 'Rahat@gmail.com',
    Department: 'backend',
    Role: 'Intern',
    JoiningDate: '08/02/2025',
  },
  {
    key: '5',
    EmployeeName: 'Nahid',
    Email: 'Nahid@gmail.com',
    Department: 'Manager',
    Role: 'CTO',
    JoiningDate: '01/01/2024',
  },
  {
    key: '6',
    EmployeeName: 'Javed',
    Email: 'Javed@gmail.com',
    Department: 'Manager',
    Role: 'CEO',
    JoiningDate: '01/01/2025',
  },
];

const EmployeeManagement = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [selectedEmployee, setSelectedEmployee] = useState<DataType | null>(null);;

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
    <Table<DataType> dataSource={data} pagination={{ pageSize: 5 }}>
      <Column title="Employee Name" dataIndex="EmployeeName" key="EmployeeName" />
      <Column title="Email" dataIndex="Email" key="Email" />
      <Column title="Department" dataIndex="Department" key="Department" />
      <Column title="Role" dataIndex="Role" key="Role" />
      <Column title="Joining Date" dataIndex="JoiningDate" key="JoiningDate" />
      <Column 
        title="Action" 
        key="Action" 
        render={(_, record: DataType) => (
          <Space size="middle">
            <FaEye size={20} style={{ cursor: 'pointer' }} onClick={() => showModal(record)} />
            <CiEdit size={20} style={{ cursor: 'pointer' }} />
            <MdDelete 
              size={20} 
              style={{ cursor: 'pointer', color: 'red' }} 
              onClick={() => handleDelete(record.key)} 
            />
            <Modal title="Employee Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {/* {selectedEmployee && <UserDetails user={selectedEmployee} />} */}
        {selectedEmployee && <EmployeeProfile user={selectedEmployee} />}

      </Modal>
          </Space>
        )} 
      />
    </Table>
  );
};

export default EmployeeManagement;
