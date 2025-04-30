import React, { useState } from "react";
import { Table, Space, Button } from "antd";
import { VscSettings } from "react-icons/vsc";
import LeaveManagementTableColumns from "../../../../components/shared/table-columns/LeaveManagementTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { LeaveRecord } from "../../../../types/props.type";
import { usePagination } from "../../../../hooks/usePagination";
import { useGetAllLeavesQuery } from "../../../../redux/api/leaveManagement";
import PageNavigation from "../../../../components/shared/PageNavigation";


const LeaveManagement: React.FC = () => {
  const { pagination, handlePageChange } = usePagination(8);

  const {
    data: leaveData,
    isLoading,
    refetch,
  } = useGetAllLeavesQuery([
    { name: "page", value: pagination.currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pagination.pageSize },
    { name: "sort", value: "id,desc" },
  ]);
  console.log(leaveData);
  const handleApprove = (id: number) => {
    console.log(id);
  };

  const handleReject = (id: number) => {
    console.log(id);
  };

  const user = useAppSelector(selectCurrentUser);
  const totalElements = leaveData?.totalElements || 0;
  const columns = LeaveManagementTableColumns(
    user?.role,
    handleApprove,
    handleReject
  );

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
