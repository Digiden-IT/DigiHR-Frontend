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
      key: "duration",
      render: (_: string, record: LeaveRecord) => {
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);

        const formatter = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "2-digit",
        });

        const startFormatted = formatter.format(startDate);
        const endFormatted = formatter.format(endDate);

        return `${startFormatted} - ${endFormatted}`;
      },
    },
    {
      title: "Days",
      dataIndex: "numberOfDays",
      key: "numberOfDays",
    },
    {
      title: "Leave Reason",
      dataIndex: ["leaveReason","name"],
      key: "leaveReason",
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
          {record.requestStatus.constant === "APPROVED" && (
            <Tag color="green" className="text-base">
              {record.requestStatus.name}
            </Tag>
          )}
          {record.requestStatus.constant === "REJECTED" && (
            <Tag color="red" className="text-base">
              {record.requestStatus.name}
            </Tag>
          )}
          {record.requestStatus.constant === "PENDING" && (
            <div className="flex gap-1">
              <Tag
                color="#108ee9"
                onClick={() => handleApprove?.(record.id)}
                className="cursor-pointer text-base"
              >
                Approve
              </Tag>
              <Tag
                color="red"
                onClick={() => handleReject?.(record.id)}
                className="cursor-pointer text-base"
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
          {record.requestStatus.constant === "APPROVED" && (
            <Tag color="green" className="text-base">
              {record.requestStatus.name}
            </Tag>
          )}
          {record.requestStatus.constant === "REJECTED" && (
            <Tag color="red" className="text-base">
              {record.requestStatus.name}
            </Tag>
          )}
          {record.requestStatus.constant === "PENDING" && (
            <Tag color="yellow" className="text-base">
              {record.requestStatus.name}
            </Tag>
          )}
        </>
      ),
    },
  ];

  if (role === "admin") {
    return [adminColumns[0], ...commonColumns, adminColumns[1]];
  } else {
    return [...commonColumns, ...(role === "user" ? userColumns : [])];
  }
};

export default LeaveManagementTableColumns;
