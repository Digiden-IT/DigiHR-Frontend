import React, { useState } from "react";
import { Table, Tag, Button } from "antd";
import { BsFilterLeft } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

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
    <>
      <div className="flex gap-4 mb-4 justify-end">
        <div className="relative w-full max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <CiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search by Date"
            className="pl-10 pr-3 py-1 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
        </div>

        <Button>
          <BsFilterLeft size={20} />
          Filter
        </Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} />
    </>
  );
};

export default LeaveManagement;
