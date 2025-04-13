import React, { useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import { VscSettings } from "react-icons/vsc";

interface DataType {
  key: string;
  name: string;
  date: string;
  duration: string;
  days: string;
  reason: string;
  action: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    date: "July 01, 2023",
    duration: "July 05 - July 08",
    days: "3 Days",
    reason: "Sick Leave",
    action: "NA",
  },
  {
    key: "2",
    name: "Jim Green",
    date: "April 05, 2023",
    duration: "April 06 - April 10",
    days: "3 Days",
    reason: "Sick Leave",
    action: "NA",
  },
  {
    key: "3",
    name: "Joe Black",
    date: "Mar 12, 2023",
    duration: "Mar 14 - Mar 16",
    days: "3 Days",
    reason: "Sick Leave",
    action: "NA",
  },
];

const LeaveManagement: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);

  const handleApprove = (key: string) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, action: "Approved" } : item
    );
    setData(updatedData);
  };

  const handleReject = (key: string) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, action: "Rejected" } : item
    );
    setData(updatedData);
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Leave Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Take Action",
      key: "action",
      dataIndex: "action",
      render: (_: string, record: DataType) => (
        <>
          {record.action === "Approved" && (
            <Tag color="green">{record.action}</Tag>
          )}
          {record.action === "Rejected" && (
            <Tag color="red">{record.action}</Tag>
          )}
          {record.action === "NA" && (
            <div className="flex gap-1">
              <Tag
                color="#108ee9"
                onClick={() => handleApprove(record.key)}
                className="cursor-pointer"
              >
                Approve
              </Tag>
              <Tag
                color="red"
                onClick={() => handleReject(record.key)}
                className="cursor-pointer"
              >
                Reject
              </Tag>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <Space className="mb-4 flex justify-end">
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

export default LeaveManagement;
