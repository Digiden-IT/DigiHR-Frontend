import { useState } from "react";
import { Space, Table, Button, TableColumnsType, PaginationProps } from "antd";
import { PiEye } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";
import AddNewEmployeeModal from "../../../../components/modals/AddNewEmployeeModal";
import DeleteModal from "../../../../components/modals/DeleteModal";
import { Link } from "react-router-dom";
import {
  useGetAllUserQuery,
  useToggleDeleteStatusMutation,
} from "../../../../redux/feature/userApi/userApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { EmployeeManagementDataType } from "../../../../types/props.type";
import PageNavigation from "../../../../components/shared/PageNavigation";
import { toast } from "sonner";

const EmployeeManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5,
  });

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useGetAllUserQuery([
    { name: "page", value: pagination.currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pagination.pageSize },
  ]);
  const totalElements = usersData?.totalElements || 0;
  const [toggleDeleteUser] = useToggleDeleteStatusMutation();
  const user = useSelector(selectCurrentUser);

  const handleAddUser = () => {
    setIsAddModalOpen(true);
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

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPagination({
      currentPage: page,
      pageSize: pageSize || pagination.pageSize,
    });
  };

  const handleOk = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await toggleDeleteUser(selectedUserId);
      toast.success("User deleted successfully", { id: toastId });
      refetch();
      handleCloseModals();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete user", { id: toastId });
    }
  };

  const columns: TableColumnsType<EmployeeManagementDataType> = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Joining Date",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: EmployeeManagementDataType) => (
        <Space size="middle">
          <Link
            to={`/${user?.role.toLowerCase()}/employee-management/user-details/${
              record.id
            }`}
          >
            <PiEye
              size={20}
              className="text-blue-500 hover:text-blue-700 border-none shadow-none"
            />
          </Link>

          <CiTrash
            size={20}
            className="text-red-500 hover:text-red-700 border-none shadow-none"
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenDeleteModal(record.id)}
          />
        </Space>
      ),
    },
  ];

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
      <Table<EmployeeManagementDataType>
        columns={columns}
        dataSource={usersData?.data}
        pagination={false}
        className="mb-6"
        loading={isLoading}
        rowKey="id"
      />
      <PageNavigation
        currentPage={pagination.currentPage}
        totalElements={totalElements}
        pageSize={pagination.pageSize}
        onChange={handlePageChange}
      />

      <AddNewEmployeeModal
        visible={isAddModalOpen}
        onCancel={handleCloseModals}
        refetchUsers={refetch}
      />
      <DeleteModal
        visible={isDeleteModalOpen}
        onCancel={handleCloseModals}
        onOk={handleOk}
        deleteModalMessage="Delete User?"
      />
    </div>
  );
};

export default EmployeeManagement;
