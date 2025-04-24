import { Table, Space, Button } from "antd";
import { VscSettings } from "react-icons/vsc";
import { EmployeeManagementDataType } from "../../../../types/props.type";
import { useGetAllUserQuery } from "../../../../redux/feature/userApi/userApi";
import EmployeeTableColumns from "../../../../components/shared/table-columns/EmployeeTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import PageNavigation from "../../../../components/shared/PageNavigation";
import { usePagination } from "../../../../hooks/usePagination";

const ViewEmployees: React.FC = () => {
  const { pagination, handlePageChange } = usePagination(7);

  const { data: usersData, isLoading } = useGetAllUserQuery([
    { name: "page", value: pagination.currentPage - 1 }, // API uses 0-indexed pagination
    { name: "size", value: pagination.pageSize },
  ]);

  const user = useAppSelector(selectCurrentUser);
  const columns = EmployeeTableColumns(user?.role);
  const totalElements = usersData?.totalElements || 0;

  return (
    <div className="p-6 min-h-screen">
      <Space className="mb-4 flex justify-between">
        <div>
          <h1 className="font-bold">All Employee List</h1>
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

export default ViewEmployees;
