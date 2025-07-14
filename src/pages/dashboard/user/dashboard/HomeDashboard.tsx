import { Avatar, Card, Table } from "antd";
import { useGetAllAnnouncementsQuery } from "../../../../redux/api/announcementApi";
import {
  AnnouncementType,
  HolidayType,
  LeaveRecord,
} from "../../../../types/props.type";
import BasicLoader from "../../../../components/shared/BasicLoader";
import { useEffect, useState } from "react";
import { LikeOutlined, LikeFilled, MessageOutlined } from "@ant-design/icons";
import LeaveManagementTableColumns from "../../../../components/shared/table-columns/LeaveManagementTableColumns";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/feature/auth/authSlice";
import { useGetAllLeavesQuery } from "../../../../redux/api/leaveManagement";
import HolidayTableColumns from "../../../../components/shared/table-columns/HolidayTableColumns";
import { useGetAllHolidaysQuery } from "../../../../redux/api/holidayManagementApi";

const HomeDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const [currentLeaves, setCurrentLeaves] = useState<LeaveRecord[]>([]);
  const [upcomingHolidays, setUpcomingHolidays] = useState<HolidayType[]>([]);
  const [reactions] = useState({
    likes: 1,
    comments: 0,
  });

  const [userReactions, setUserReactions] = useState({
    liked: false,
  });
  const { data: announcements, isLoading } = useGetAllAnnouncementsQuery([
    { name: "sort", value: "announcementDate,desc" },
  ]);
  const { data: holidayData } = useGetAllHolidaysQuery([
    { name: "sort", value: "date" },
  ]);
  const { data: leaveData } = useGetAllLeavesQuery([]);

  const employeeLeaveColumns = LeaveManagementTableColumns(
    user?.role + "DashboardPage"
  );
  const holidayColumns = HolidayTableColumns(user?.role);

  useEffect(() => {
    if (leaveData?.data) {
      const formatDateString = (dateString: string) => {
        if (!dateString) return null;
        try {
          return new Date(dateString).toISOString().split("T")[0];
        } catch (error) {
          console.log(error);
          return null;
        }
      };
      const today = new Date();
      const todayFormatted = today.toISOString().split("T")[0];

      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + 7);
      const sevenDaysLaterFormatted = sevenDaysLater
        .toISOString()
        .split("T")[0];

      const approvedLeaves = leaveData.data.filter(
        (leave: LeaveRecord) => leave.requestStatus?.constant === "APPROVED"
      );

      const upcomingLeaves = approvedLeaves.filter((leave: LeaveRecord) => {
        const startDateStr = formatDateString(leave.startDate);
        if (!startDateStr) return false;

        return (
          todayFormatted <= startDateStr &&
          startDateStr <= sevenDaysLaterFormatted
        );
      });

      setCurrentLeaves(upcomingLeaves);
    }
  }, [leaveData]);

  useEffect(() => {
    if (holidayData?.data) {
      const upcoming = holidayData.data.filter(
        (holiday: HolidayType) => holiday.isUpcoming === true
      );

      setUpcomingHolidays(upcoming);
    }
  }, [holidayData]);

  const handleReaction = (type: string) => {
    if (type === "like") {
      setUserReactions({ ...userReactions, liked: !userReactions.liked });
    }
  };

  if (isLoading) {
    <BasicLoader />;
  }
  return (
    <div className="min-h-screen p-4 overflow-scroll md:overflow-hidden">
      <div className="text-3xl font-semibold mb-4 text-center bg-white rounded-lg shadow-md p-10">
        Hi, {user?.name}
        {user?.role === "ADMIN" ? " 🚀🚀🚀" : " 👋"}
      </div>

      <div className="grid md:grid-cols-12 gap-2 h-screen ">
        <div className="col-span-12  md:col-span-7 flex flex-col min-h-screen">
          <div className="overflow-y-auto flex-grow pr-2 no-scrollbar">
            {announcements?.data.map((announcement: AnnouncementType) => (
              <Card
                key={announcement.id}
                className="shadow-md rounded-lg border border-blue-300 mb-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar
                    size={30}
                    src={"https://avatar.iran.liara.run/public/boy"}
                  />
                  <div>
                    <h4 className="font-medium">{announcement.authorName}</h4>
                    <h6 className="text-gray-500 text-sm">
                      {announcement.announcementDate}
                    </h6>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#2b789e] font-serif">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 my-2 whitespace-pre-line">
                  {announcement.description}
                </p>
                {/* Reaction stats */}
                <div className="flex justify-between items-center mt-5 text-xs text-gray-500  ">
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1">
                      <span className="flex items-center justify-center bg-blue-100 rounded-full p-1">
                        <LikeFilled
                          style={{ color: "#1890ff", fontSize: "12px" }}
                        />
                      </span>
                      {reactions.likes}
                    </span>
                  </div>
                  <div>
                    <span>{reactions.comments} comments</span>
                  </div>
                </div>

                {/* Reaction buttons */}
                <div className="flex justify-around items-center mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleReaction("like")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 ${
                      userReactions.liked ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {userReactions.liked ? (
                      <LikeFilled style={{ fontSize: "18px" }} />
                    ) : (
                      <LikeOutlined style={{ fontSize: "18px" }} />
                    )}
                    <span className="text-sm">Like</span>
                  </button>

                  <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">
                    <MessageOutlined style={{ fontSize: "18px" }} />
                    <span className="text-sm">Comment</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="col-span-12  md:col-span-5 flex-col gap-4 md:h-full ">
          <div className="flex-1 mb-3 shadow-2xl rounded-lg ">
            <div className=" mb-2 font-semibold text-center rounded-t-lg bg-[#60032a] text-white font-serif p-2">
              Employees on Leave
            </div>
            <div className="overflow-y-auto max-h-[400px] no-scrollbar">
              <Table<LeaveRecord>
                columns={employeeLeaveColumns}
                dataSource={currentLeaves}
                pagination={false}
                loading={isLoading}
                rowKey="id"
              />
            </div>
          </div>
          <div className="mb-4 flex-1 shadow-2xl bg-white rounded-lg">
            <div className="mb-2 font-semibold text-center rounded-t-lg bg-[#60032a] text-white font-serif p-2">
              Upcoming Holidays
            </div>
            <div className="overflow-y-auto max-h-[400px] no-scrollbar">
              <Table<HolidayType>
                columns={holidayColumns}
                dataSource={upcomingHolidays}
                pagination={false}
                rowKey="id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
