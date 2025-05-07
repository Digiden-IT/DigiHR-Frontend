import React from "react";
import {
  AiOutlineExclamationCircle,
  AiOutlineFire,
} from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { LeaveCardTypes, LeaveStatsCardProps } from "../../types/props.type";

const LeaveStatsCards: React.FC<LeaveStatsCardProps> = ({
  totalLeaves,
  availableLeaves,
  pendingLeaves,
  usedLeaves,
}) => {

  const pluralize = (count: number, text: string) =>
    `${count} ${text}${count !== 1 ? "s" : ""}`;

  const cards: LeaveCardTypes[] = [
    {
      bgColor: "bg-sky-600/30",
      textColor: "text-black",
      icon: <AiOutlineFire size={40} className="ml-3" />,
      title: "Total Leaves Available",
      description: `${pluralize(
        availableLeaves,
        "day"
      )} out of ${totalLeaves} available`,
    },
    {
      bgColor: "bg-amber-300/30",
      textColor: "text-black",
      icon: <AiOutlineExclamationCircle size={40} className="ml-3" />,
      title: "Pending Requests",
      description: `${pluralize(pendingLeaves, "day")} leave ${
        pendingLeaves === 1 ? "is" : "are"
      } pending`,
    },
    {
      bgColor: "bg-[#d6ccff]",
      textColor: "text-black",
      icon: <CiCircleCheck size={40} className="ml-3" />,
      title: "Used Leaves",
      description: `${pluralize(
        usedLeaves,
        "day"
      )} out of ${totalLeaves} leaves used`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-1 border border-gray-300 rounded-lg ${card.bgColor} flex items-center h-20`}
        >
          <div className={`flex items-center ${card.textColor} my-auto`}>
            {card.icon}
            <div className="ml-4">
              <h4 className="font-semibold text-base">{card.title}</h4>
              <p className="text-sm">{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveStatsCards;
