import { Table, Space, Button } from "antd";
import { VscSettings } from "react-icons/vsc";

interface DataType {
  key: string;
  name: string;
  designation: string;
  joining_date: string;
  email: string;
  mobile_number: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    designation: "UI/UX Designer",
    joining_date: "July 14, 2024",
    email: "something@gmail.com",
    mobile_number: "01234546",
  },
  {
    key: "2",
    name: "Jim Green",
    designation: "Sales manager",
    joining_date: "August 14, 2024",
    email: "antor@gmail.com",
    mobile_number: "01234546",
  },
  {
    key: "3",
    name: "Joe Black",
    designation: "Full Stack",
    joining_date: "July 14, 2024",
    email: "something@gmail.com",
    mobile_number: "01234546",
  },
];

const ViewEmployees: React.FC = () => {
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      key: "joining_date",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile_number",
      key: "mobile_number",
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <Space className="mb-4 flex justify-between">
        <div>
          <h1 className="font-bold">All Employee List</h1>
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
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default ViewEmployees;
