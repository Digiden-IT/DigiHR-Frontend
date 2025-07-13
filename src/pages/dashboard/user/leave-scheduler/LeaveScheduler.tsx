import React, { useState } from "react";
import { Table, Button } from "antd";
import { FaPlus } from "react-icons/fa";
import LeaveManagementTableColumns from "../../../../components/shared/table-columns/LeaveManagementTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { LeaveRecord } from "../../../../types/props.type";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetAllLeavesQuery } from "../../../../redux/api/leaveManagement";
import { useGetLeaveSummaryQuery } from "../../../../redux/feature/userApi/userLeaveScheduleApi";
import PageNavigation from "../../../../components/shared/PageNavigation";
import BasicLoader from "../../../../components/shared/BasicLoader";
import LeaveStatsCards from "../../../../components/cards/LeaveStatsCards";
import AddLeaveRequestModal from "../../../../components/modals/AddLeaveRequestModal";

const LeaveScheduler: React.FC = () => {
  const { pagination, handlePageChange } = usePagination(5);
  const user = useAppSelector(selectCurrentUser);
  const [isAddLeaveRequestModalOpen, setIsAddLeaveRequestModalOpen] =
    useState(false);

  const {
    data: leaveData,
    isLoading,
    refetch: refetchLeaveData,
  } = useGetAllLeavesQuery([
    { name: "page", value: pagination.currentPage - 1 },
    { name: "size", value: pagination.pageSize },
    { name: "sort", value: "id,desc" },
    { name: "requestedBy", value: user?.id },
  ]);

  const {
    data: leaveSummary,
    refetch: refetchLeaveSummary,
    isLoading: isSummaryLoading,
  } = useGetLeaveSummaryQuery(undefined);

  const handleOpenAddModal = () => {
    setIsAddLeaveRequestModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddLeaveRequestModalOpen(false);
  };

  const handleRefetch = async () => {
    await Promise.all([refetchLeaveData(), refetchLeaveSummary()]);
  };

  const totalElements = leaveData?.totalElements || 0;
  const columns = LeaveManagementTableColumns(user?.role);

  if (isLoading || isSummaryLoading) {
    return <BasicLoader />;
  }

  return (
    <div className="p-6 min-h-screen bg-[#FAF4EF]">
      <LeaveStatsCards
        totalLeaves={leaveSummary?.totalLeave}
        availableLeaves={leaveSummary?.availableLeave}
        pendingLeaves={leaveSummary?.pendingLeave}
        usedLeaves={leaveSummary?.usedLeave}
      />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-center">
          Leave Request Lists
        </h1>
        <Button
          className="btn-1"
          icon={<FaPlus />}
          onClick={handleOpenAddModal}
        >
          Apply Leave Request
        </Button>
      </div>
      <Table<LeaveRecord>
        columns={columns}
        dataSource={leaveData?.data}
        pagination={false}
        className="mb-6"
        loading={isLoading}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
      {totalElements !== 0 && (
        <PageNavigation
          currentPage={pagination.currentPage}
          totalElements={totalElements}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
        />
      )}
      <AddLeaveRequestModal
        visible={isAddLeaveRequestModalOpen}
        onCloseModal={handleCloseModal}
        refetchLeave={handleRefetch}
      />
    </div>
  );
};

export default LeaveScheduler;
