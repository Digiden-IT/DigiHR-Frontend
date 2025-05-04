import { Button, Table, Tag } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HolidayType } from "../../../../types/props.type";
import AddNewHoliday from "../../../../components/modals/AddNewHoliday";
import DeleteModal from "../../../../components/modals/DeleteModal";
import {
  useGetAllHolidaysQuery,
  useDeleteHolidayMutation,
} from "../../../../redux/api/holidayManagementApi";
import BasicLoader from "../../../../components/shared/BasicLoader";
import PageNavigation from "../../../../components/shared/PageNavigation";
import { toast } from "sonner";
import { usePagination } from "../../../../hooks/usePagination";
import HolidayTableColumns from "../../../../components/shared/table-columns/HolidayTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";

const HolidayManagement: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState<number>(0);
  const { pagination, handlePageChange } = usePagination(8);
  const user = useAppSelector(selectCurrentUser);

  const [deleteHoliday, { isLoading: isDeleting }] = useDeleteHolidayMutation();

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

  const handleOk = async () => {
    if (isDeleting) return;

    const toastId = toast.loading("Deleting...");
    try {
      await deleteHoliday(selectedHolidayId);
      toast.success("Holiday deleted successfully", { id: toastId });
      refetch();
      handleCloseModals();
    } catch (error) {
      toast.error("Failed to delete holiday", { id: toastId });
    }
  };
  const columns = HolidayTableColumns(user?.role, handleOpenDeleteModal);
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
        style={{ border: "1px solid blue", borderRadius: "1px" }}
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
        {totalElements !== 0 && (
          <PageNavigation
            currentPage={pagination.currentPage}
            totalElements={totalElements}
            pageSize={pagination.pageSize}
            onChange={handlePageChange}
          />
        )}
      </div>

      {/* Modals */}
      <AddNewHoliday
        visible={isAddModalOpen}
        onCloseModal={handleCloseModals}
        refetchHolidays={refetch}
      />

      <DeleteModal
        visible={isDeleteModalOpen}
        onCloseModal={handleCloseModals}
        onOk={handleOk}
        deleteModalMessage="Delete Holiday?"
      />
    </div>
  );
};

export default HolidayManagement;
