import React from 'react';
import { Space, Table } from 'antd';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const { Column } = Table;

interface DataType {
  key: React.Key;
  EmployeeName: string;
  Email: string;
  Department: string;
  Role: string;
  JoiningDate: string;
}

const data: DataType[] = [
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

const EmployeeManagement = () => (
  <Table<DataType> dataSource={data}>
    
    <Column title="Employee Name" dataIndex="EmployeeName" key="EmployeeName" />
   
    <Column title="Email" dataIndex="Email" key="Email" />
    <Column title="Department" dataIndex="Department" key="Department" />
    <Column title="Role" dataIndex="Role" key="Role" />
    <Column title="JoiningDate" dataIndex="JoiningDate" key="JoiningDate" />
    <Column title="Action" dataIndex="Action" key="Action" render={() => (
        <Space size="middle">
          <FaEye size={20} />
          <CiEdit size={20} />
          <MdDelete size={20} />
        </Space>
      )} />
  </Table>
);

export default EmployeeManagement;
