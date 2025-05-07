import { TableColumnsType } from "antd";
import { CiTrash } from "react-icons/ci";
import { HolidayType } from "../../../types/props.type";

const HolidayTableColumns = (
  currentUserRole: string | undefined,
  handleOpenDeleteModal?: (id: number) => void
): TableColumnsType<HolidayType> => {
  const role = currentUserRole?.toLowerCase();

  const commonColumns: TableColumnsType<HolidayType> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: HolidayType) => (
        <div className="flex items-center">
          <div
            className={`w-1 h-7 ${
              record.isUpcoming ? "bg-one" : "bg-three"
            } mr-2`}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Holiday Name",
      dataIndex: "holidayName",
      key: "holidayName",
    },
  ];

  const adminColumns: TableColumnsType<HolidayType> = [
    {
      title: "Day",
      dataIndex: "dayOfWeek",
      key: "dayOfWeek",
    },
     {
          title: "Action",
          key: "action",
          render: (_, record: HolidayType) => (
            <CiTrash
              style={{ cursor: "pointer" }}
              size={20}
              className="text-red-500 hover:text-red-700 border-none shadow-none"
              onClick={() => handleOpenDeleteModal?.(record.id)}
            />
          ),
        },
      ];

      if(role === "admin") {
        return [commonColumns[0],adminColumns[0],commonColumns[1],adminColumns[1]];
      } else {
        return [commonColumns[0],commonColumns[1]];
        }
};

export default HolidayTableColumns;
