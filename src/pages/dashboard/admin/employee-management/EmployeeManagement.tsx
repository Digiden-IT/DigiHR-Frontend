import { useState } from "react";
import { Space, Table, Button } from "antd";
import { VscSettings } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";
import AddNewEmployeeModal from "../../../../components/modals/AddNewEmployeeModal";
import DeleteModal from "../../../../components/modals/DeleteModal";
import {
  useGetAllUserQuery,
  useToggleDeleteStatusMutation,
} from "../../../../redux/feature/userApi/userApi";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { EmployeeFormValues } from "../../../../types/props.type";
import PageNavigation from "../../../../components/shared/PageNavigation";
import { toast } from "sonner";
import { EmployeeTableColumns } from "../../../../components/shared/table-columns/EmployeeTableColumns";
import { usePagination } from "../../../../hooks/usePagination";

const EmployeeManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const { pagination, handlePageChange } = usePagination(8);

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useGetAllUserQuery([
    { name: "page", value: pagination.currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pagination.pageSize },
  ]);
  console.log(usersData);
  const totalElements = usersData?.totalElements || 0;
  const [toggleDeleteUser] = useToggleDeleteStatusMutation();
  const user = useAppSelector(selectCurrentUser);

  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteUser = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await toggleDeleteUser(selectedUserId);
      toast.success("User deleted successfully", { id: toastId });
      refetch();
      handleCloseModals();
    } catch (error) {
      toast.error("Failed to delete user", { id: toastId });
    }
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUserId(0);
  };

  const handleOpenDeleteModal = (id: number) => {
    setIsDeleteModalOpen(true);
    setSelectedUserId(id);
  };

  const columns = EmployeeTableColumns(user?.role, handleOpenDeleteModal);

  return (
    <div className="p-6 min-h-screen">
      <Space className="mb-4 flex justify-between">
        <div>
          <Button
            className="btn-1"
            icon={<FaPlus />}
            onClick={() => handleAddUser()}
          >
            Add Employee
          </Button>
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
      <Table<EmployeeFormValues>
        columns={columns}
        dataSource={usersData?.data}
        pagination={false}
        className="mb-6"
        loading={isLoading}
        rowKey="id"
      />
      {totalElements !== 0 && (
        <PageNavigation
          currentPage={pagination.currentPage}
          totalElements={totalElements}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
        />
      )}

      <AddNewEmployeeModal
        visible={isAddModalOpen}
        onCloseModal={handleCloseModals}
        refetchUsers={refetch}
      />
      <DeleteModal
        visible={isDeleteModalOpen}
        onCloseModal={handleCloseModals}
        onOk={handleDeleteUser}
        deleteModalMessage="Delete User?"
      />
    </div>
  );
};

export default EmployeeManagement;
