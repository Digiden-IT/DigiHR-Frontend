import React from "react";
import { Table, Space, Button } from "antd";
import { VscSettings } from "react-icons/vsc";
import LeaveManagementTableColumns from "../../../../components/shared/table-columns/LeaveManagementTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { LeaveRecord } from "../../../../types/props.type";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetAllLeavesQuery,useUpdateLeaveMutation } from "../../../../redux/api/leaveManagement";
import PageNavigation from "../../../../components/shared/PageNavigation";
import BasicLoader from "../../../../components/shared/BasicLoader";
import { toast } from "sonner";

const LeaveManagement: React.FC = () => {
  const { pagination, handlePageChange } = usePagination(8);
  const user = useAppSelector(selectCurrentUser);
  const [useUpdate, { isLoading: isUpdating }] = useUpdateLeaveMutation();

  const {
    data: leaveData,
    isLoading,
    refetch,
  } = useGetAllLeavesQuery([
    { name: "page", value: pagination.currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pagination.pageSize },
    { name: "sort", value: "id,desc" },
  ]);

  const handleLeaveStatusUpdate = async (
    id: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    const isApproving = status === "APPROVED";
    const actionText = isApproving ? "approving" : "rejecting";
    const successText = isApproving ? "approved" : "rejected";

    const toastId = toast.loading(
      `${isApproving ? "Approving" : "Rejecting"} leave request...`
    );

    try {
      await useUpdate({
        id: id,
        requestStatus: status,
      }).unwrap();

      toast.success(`Leave ${successText} successfully!`, { id: toastId });
      refetch();
    } catch (err) {
      toast.error(`Failed to ${actionText} leave`, { id: toastId });
    }
  };

  const handleApprove = (id: number) => handleLeaveStatusUpdate(id, "APPROVED");
  const handleReject = (id: number) => handleLeaveStatusUpdate(id, "REJECTED");

  const totalElements = leaveData?.totalElements || 0;
  const columns = LeaveManagementTableColumns(
    user?.role,
    handleApprove,
    handleReject
  );
  if (isLoading || isUpdating) {
    return <BasicLoader />;
  }
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
      <Table<LeaveRecord>
        columns={columns}
        dataSource={leaveData?.data}
        pagination={false}
        className="mb-6"
        loading={isLoading}
        rowKey="id"
        style={{ border: "1px solid blue", borderRadius: "1px" }}
      />
      {totalElements !== 0 && (
        <PageNavigation
          currentPage={pagination.currentPage}
          totalElements={totalElements}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default LeaveManagement;
