import { Button, Modal, Table, Tag } from "antd";
import { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import type { TableColumnsType, PaginationProps } from "antd";
import { HolidayType } from "../../../../types/props.type";
import AddNewHoliday from "../../../../components/modals/AddNewHoliday";
import {
  useGetAllHolidaysQuery,
  useDeleteHolidayMutation,
} from "../../../../redux/api/holidayManagementApi";
import BasicLoader from "../../../../components/shared/BasicLoader";
import PageNavigation from "../../../../components/shared/PageNavigation";
import { toast } from "sonner";

const HolidayManagement: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState<number>(0);
  const [deleteHoliday, { isLoading: isDeleting }] = useDeleteHolidayMutation();
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
    setSelectedHolidayId(0);
  };

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPagination({
      currentPage: page,
      pageSize: pageSize || pagination.pageSize,
    });
  };
  const handleOk = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteHoliday(selectedHolidayId);
      toast.success("Holiday deleted successfully", { id: toastId });
      refetch();
      handleCloseModals();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete holiday", { id: toastId });
    }
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
        <CiTrash
          size={20}
          className="text-red-500 hover:text-red-700 border-none shadow-none"
          onClick={() => handleOpenDeleteModal(record.id)}
        />
      ),
    },
  ];

  if (isLoading || isFetching) {
    return <BasicLoader />;
  }

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

        <PageNavigation
          currentPage={pagination.currentPage}
          totalElements={totalElements}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      <AddNewHoliday
        visible={isAddModalOpen}
        onCancel={handleCloseModals}
        refetchHolidays={refetch}
      />

      <Modal
        open={isDeleteModalOpen}
        okText="Ok"
        cancelText="Cancel"
        centered
        closable={false}
        className="rounded-xl"
        title={
          <div className="text-xl font-semibold mb-6 text-center text-red-500">
            Delete Holiday?
          </div>
        }
        footer={
          <div className="flex justify-center gap-4 mt-8">
            <Button
              className="py-2 border rounded-md"
              onClick={handleCloseModals}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button className="btn-1" onClick={handleOk} loading={isDeleting}>
              Ok
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default HolidayManagement;
