import React from "react";
import {
  AiFillCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineFire,
} from "react-icons/ai";

interface LeaveStatsCardProps {
  totalLeaves: number;
  availableLeaves: number;
  pendingRequests: number;
  usedLeaves: number;
}

const LeaveStatsCards: React.FC<LeaveStatsCardProps> = ({
  totalLeaves,
  availableLeaves,
  pendingRequests,
  usedLeaves,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
        <div className="p-1 border-[1px] border-[#ccccccd9] rounded-lg bg-[#115DD4] flex items-center h-20">
          <div className="flex items-center text-white my-auto">
            <AiOutlineFire size={40} className="ml-3" />
            <div className="ml-4">
              <h4 className="font-semibold text-base">
                Total Leaves Available
              </h4>
              <p className="text-sm">
                {availableLeaves} day{availableLeaves !== 1 ? "s" : ""} out of{" "}
                {totalLeaves} available
              </p>
            </div>
          </div>
        </div>
        <div className="p-1 border-[1px] border-[#ccccccd9] rounded-lg bg-[#FFC84B] flex items-center h-20">
          <div className="flex items-center text-black my-auto">
            <AiOutlineExclamationCircle size={40} className="ml-3" />
            <div className="ml-4">
              <h4 className="font-semibold text-base">Pending Requests</h4>
              <p className="text-sm">
                {pendingRequests} day{pendingRequests !== 1 ? "s" : ""}
                {" leave "}
                {pendingRequests !== 1 ? "are" : "is"} in pending
              </p>
            </div>
          </div>
        </div>
        <div className="p-1 border-[1px] border-[#ccccccd9] rounded-lg bg-[#03A65D] flex items-center h-20">
          <div className="flex items-center text-white my-auto">
            <AiFillCheckCircle size={40} className="ml-3" />
            <div className="ml-3">
              <h4 className="font-semibold text-base">Used Leaves </h4>
              <p className="text-sm">
                {usedLeaves} day{usedLeaves !== 1 ? "s" : ""} out of{" "}
                {totalLeaves} leaves are used
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveStatsCards;
