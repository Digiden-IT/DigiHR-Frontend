import { Table, Button } from "antd";
import { VscSettings } from "react-icons/vsc";
import { EmployeeFormValues } from "../../../../types/props.type";
import { useGetAllUserQuery } from "../../../../redux/feature/userApi/userApi";
import EmployeeTableColumns from "../../../../components/shared/table-columns/EmployeeTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import PageNavigation from "../../../../components/shared/PageNavigation";
import { usePagination } from "../../../../hooks/usePagination";

const ViewEmployees: React.FC = () => {
  const { pagination, handlePageChange } = usePagination(7);

  const { data: usersData, isLoading } = useGetAllUserQuery([
    { name: "page", value: pagination.currentPage - 1 },
    { name: "size", value: pagination.pageSize },
  ]);
  const user = useAppSelector(selectCurrentUser);
  const columns = EmployeeTableColumns(user?.role);
  const totalElements = usersData?.totalElements || 0;

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-4 flex flex-col md:flex-row gap-4 md:justify-center bg-[#60032a] text-white rounded-lg">
        <h1 className="text-2xl font-semibold text-center  ">
          All Employee List
        </h1>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Date"
            className="hidden w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* todo: show this button  */}
          <Button className="rounded-md hidden">
            <VscSettings size={20} />
            Filter
          </Button>
        </div>
      </div>
      <Table<EmployeeFormValues>
        columns={columns}
        dataSource={usersData?.data}
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
    </div>
  );
};

export default ViewEmployees;
