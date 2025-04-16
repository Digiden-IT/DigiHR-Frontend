// HolidayManagement.tsx
import { Button, Table, Pagination, Tag } from "antd";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import type { TableColumnsType, PaginationProps } from "antd";
import { HolidayType } from "../../../../types/props.type";
import AddNewHoliday from "../../../../components/modals/AddNewHoliday";
import { useGetAllHolidaysQuery } from "../../../../redux/api/holidayManagementApi";
import BasicLoader from "../../../../components/shared/BasicLoader";

const HolidayManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const { data, isLoading} = useGetAllHolidaysQuery([
    { name: "page", value: currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pageSize },
    { name: "sort", value: "date" },
    
  ]);

  const holidaysData: HolidayType[] = data?.data || [];
  const totalElements = data?.totalElements || 0;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewHoliday = (holiday: HolidayType) => {
    // Will be implemented with mutation
    console.log("New holiday to add:", holiday);
  };

  const columns: TableColumnsType<HolidayType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: HolidayType) => (
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
      dataIndex: "dayOfWeek",
      key: "dayOfWeek",
    },
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
    },
    {
      title: "",
      key: "action",
      render: (_: unknown, record: HolidayType) => (
        <CiTrash
          className="text-red-500"
          size={20}
          onClick={() => console.log(record.id)}
        />
      ),
    },
  ];

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  if (isLoading) {
    return <BasicLoader />;
  }

  return (
    <div className="p-6 min-h-screen">
      <Button
        icon={<FaPlus />}
        className="btn-1 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Holiday
      </Button>

      <Table<HolidayType>
        columns={columns}
        dataSource={holidaysData}
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
          total={totalElements}
          pageSize={pageSize}
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
      <AddNewHoliday
        visible={isModalOpen}
        onAdd={handleNewHoliday}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default HolidayManagement;
