import { TableColumnsType, Tag } from "antd";
import { LeaveRecord } from "../../../types/props.type";

export const LeaveManagementTableColumns = (
  currentUserRole: string | undefined,
  handleApprove?: (id: number) => void,
  handleReject?: (id: number) => void
): TableColumnsType<LeaveRecord> => {
  const role = currentUserRole?.toLowerCase();

  const commonColumns: TableColumnsType<LeaveRecord> = [
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Duration",
      dataIndex: "numberOfDays",
      key: "numberOfDays",
    },
    {
      title: "Leave Reason",
      dataIndex: "leaveReason",
      key: "leaveReason",
    },
    {
      title: "Duration",
      dataIndex: "",
      key: "",
    },
  ];

  const adminColumns: TableColumnsType<LeaveRecord> = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Take Action",
      key: "action",
      dataIndex: "action",
      render: (_: string, record: LeaveRecord) => (
        <>
          {record.requestStatus === "Approved" && (
            <Tag color="green">Approved</Tag>
          )}
          {record.requestStatus === "Rejected" && (
            <Tag color="red"> Rejected</Tag>
          )}
          {record.requestStatus === "Pending" && (
            <div className="flex gap-1">
              <Tag
                color="#108ee9"
                onClick={() => handleApprove?.(record.id)}
                className="cursor-pointer"
              >
                Approve
              </Tag>
              <Tag
                color="red"
                onClick={() => handleReject?.(record.id)}
                className="cursor-pointer"
              >
                Reject
              </Tag>
            </div>
          )}
        </>
      ),
    },
  ];
  const userColumns: TableColumnsType<LeaveRecord> = [
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_: string, record: LeaveRecord) => (
        <>
          {record.requestStatus === "Approved" && <Tag color="green">Approved</Tag>}
          {record.requestStatus === "Rejected" && <Tag color="red"> Rejected</Tag>}
          {record.requestStatus === "Pending" && <Tag color="yellow">Pending</Tag>}
        </>
      ),
    },
  ];

  return [
    ...commonColumns,
    ...(role === "user" ? userColumns : []),
    ...(role === "admin" ? adminColumns : []),
  ];
};

export default LeaveManagementTableColumns;
