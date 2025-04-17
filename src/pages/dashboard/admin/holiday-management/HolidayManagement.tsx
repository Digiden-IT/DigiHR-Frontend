import { Button, Table, Pagination, Tag } from "antd";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import type { TableColumnsType, PaginationProps } from "antd";
import { HolidayType } from "../../../../types/props.type";
import AddNewHoliday from "../../../../components/modals/AddNewHoliday";
import DeleteHoliday from "../../../../components/modals/DeleteHoliday";
import { useGetAllHolidaysQuery } from "../../../../redux/api/holidayManagementApi";
import BasicLoader from "../../../../components/shared/BasicLoader";

const HolidayManagement: React.FC = () => {
  // State hooks
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState<number>(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const { data, isLoading, refetch, isFetching } = useGetAllHolidaysQuery([
    { name: "page", value: pagination.currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pagination.pageSize },
    { name: "sort", value: "date" },
  ]);

  const holidaysData: HolidayType[] = data?.data || [];
  const totalElements = data?.totalElements || 0;

  const handleOpenAddModal = () => setIsAddModalOpen(true);

  const handleOpenDeleteModal = (id: number) => {
    setIsDeleteModalOpen(true);
    setSelectedHolidayId(id);
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPagination({
      currentPage: page,
      pageSize: pageSize || pagination.pageSize,
    });
  };

  const columns: TableColumnsType<HolidayType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: HolidayType) => (
        <div className="flex items-center">
          <div
            className={`w-1 h-7 ${
              new Date(record.date) > new Date() ? "bg-one" : "bg-three"
            } mr-2`}
          />
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
      render: (_, record: HolidayType) => (
        <Button
          icon={<CiTrash />}
          onClick={() => handleOpenDeleteModal(record.id)}
          className="text-red-500 hover:text-red-700 border-none shadow-none"
        />
      ),
    },
  ];

  if (isLoading || isFetching) {
    return <BasicLoader />;
  }

  const renderLegend = () => (
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
  );

  const paginationItemRender = (
    page: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "page") {
      return (
        <div
          className={`flex items-center justify-center w-8 h-8 rounded ${
            page === pagination.currentPage
              ? "btn-1 text-white"
              : "bg-white text-black border border-purple-500"
          }`}
        >
          {page}
        </div>
      );
    }
    return originalElement;
  };

  return (
    <div className="p-6 min-h-screen">
      <Button
        icon={<FaPlus />}
        className="btn-1 mb-4"
        onClick={handleOpenAddModal}
      >
        Add New Holiday
      </Button>

      <Table<HolidayType>
        columns={columns}
        dataSource={holidaysData}
        pagination={false}
        className="mb-6"
        rowKey="id"
      />

      <div className="flex justify-between items-center mt-4">
        {renderLegend()}

        <Pagination
          current={pagination.currentPage}
          total={totalElements}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          itemRender={paginationItemRender}
        />
      </div>

      {/* Modals */}
      <AddNewHoliday
        visible={isAddModalOpen}
        onCancel={handleCloseModals}
        refetchHolidays={refetch}
      />

      <DeleteHoliday
        visible={isDeleteModalOpen}
        onCancel={handleCloseModals}
        refetchHolidays={refetch}
        id={selectedHolidayId}
      />
    </div>
  );
};

export default HolidayManagement;
