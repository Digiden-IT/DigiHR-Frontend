import { Button, Table, Pagination, Tag } from "antd";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import type { TableColumnsType, PaginationProps } from "antd";
import { Holiday } from "../../../../types/props.type";

const HolidayManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false) ;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const holidaysData: Holiday[] = [
    {
      key: "1",
      date: "January 01, 2025",
      day: "Tuesday",
      holidayName: "New Year",
    },
    {
      key: "2",
      date: "January 07, 2025",
      day: "Saturday",
      holidayName: "International Programmers' Day",
    },
    {
      key: "3",
      date: "February 04, 2025",
      day: "Saturday",
      holidayName: "World Cancer Day",
    },
    {
      key: "4",
      date: "April 01, 2025",
      day: "Saturday",
      holidayName: "April Fool Day",
    },
    {
      key: "5",
      date: "May 07, 2025",
      day: "Monday",
      holidayName: "International Programmers' Day",
    },
    {
      key: "6",
      date: "May 22, 2025",
      day: "Tuesday",
      holidayName: "International Day for Biological Diversity",
    },
    {
      key: "7",
      date: "June 05, 2025",
      day: "Monday",
      holidayName: "International Day for Biological Diversity",
    },
    {
      key: "8",
      date: "August 07, 2025",
      day: "Monday",
      holidayName: "International Friendship Day",
    },
    {
      key: "9",
      date: "September 15, 2025",
      day: "Friday",
      holidayName: "International Day of Democracy",
    },
    {
      key: "10",
      date: "November 14, 2025",
      day: "Tuesday",
      holidayName: "World Diabetes Day",
    },
    {
      key: "11",
      date: "December 25, 2025",
      day: "Monday",
      holidayName: "Merry Chrismas",
    },
  ];

  const columns: TableColumnsType<Holiday> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: Holiday) => (
        <div className="flex items-center">
          {new Date(record.date) > new Date() ? (
            <div className="w-1 h-7 bg-one mr-2"></div>
          ) : (
            <div className="w-1 h-7 bg-three mr-2"></div>
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
    },
    {
      title: "",
      key: "action",
      render: (_: unknown, record: Holiday) => (
        <CiTrash className="text-red-500" size={20} />
      ),
    },
  ];

  const getCurrentData = (): Holiday[] => {
    return holidaysData.slice((currentPage - 1) * 10, currentPage * 10);
  };

  const handlePageChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 min-h-screen">
      <Button icon={<FaPlus />} className="btn-1 mb-4" onClick={()=>setIsModalOpen(true)}>
        Add New Holiday
      </Button>

      <Table<Holiday>
        columns={columns}
        dataSource={getCurrentData()}
        pagination={false}
        className="mb-6"
      />

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="mr-2">
            <Tag color="purple" className="flex items-center">
              <div className="w-2 h-2 bg-one rounded-full mr-1"></div>
              Upcoming
            </Tag>
          </div>
          <div>
            <Tag color="default" className="flex items-center">
              <div className="w-2 h-2 bg-three rounded-full mr-1"></div>
              Past Holidays
            </Tag>
          </div>
        </div>

        <Pagination
          current={currentPage}
          total={holidaysData.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === "page") {
              return (
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded ${
                    page === currentPage
                      ? "btn-1 text-white"
                      : "bg-white text-black border border-purple-500"
                  }`}
                >
                  {page}
                </div>
              );
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
};

export default HolidayManagement;
