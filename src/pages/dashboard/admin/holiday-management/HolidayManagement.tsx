// import { FaPlus } from "react-icons/fa";
// import { Button } from "antd";

// const HolidayManagement = () => {
//   return (
//     <>
//       <div className="p-6 min-h-screen">
//         <Button
//           className="btn-1"
//           icon={<FaPlus />}
//           onClick={() => {
//             alert("hoaihr");
//           }}
//         >
//           Add New Holiday
//         </Button>
//       </div>
//     </>
//   );
// };

import React, { useState } from "react";
import { FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "antd";

const HolidayCalendar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState("upcoming");

  // Sample holiday data
  const holidayData = [
    { key: "1", date: "January 01, 2023", day: "Tuesday", name: "New Year" },
    {
      key: "2",
      date: "January 07, 2023",
      day: "Saturday",
      name: "International Programmers' Day",
    },
    {
      key: "3",
      date: "February 04, 2023",
      day: "Saturday",
      name: "World Cancer Day",
    },
    {
      key: "4",
      date: "April 01, 2023",
      day: "Saturday",
      name: "April Fool Day",
    },
    {
      key: "5",
      date: "May 07, 2023",
      day: "Monday",
      name: "International Programmers' Day",
    },
    {
      key: "6",
      date: "May 22, 2023",
      day: "Tuesday",
      name: "International Day for Biological Diversity",
    },
    {
      key: "7",
      date: "June 05, 2023",
      day: "Monday",
      name: "International Day for Biological Diversity",
    },
    {
      key: "8",
      date: "August 07, 2023",
      day: "Monday",
      name: "International Friendship Day",
    },
    {
      key: "9",
      date: "September 15, 2023",
      day: "Friday",
      name: "International Day of Democracy",
    },
    {
      key: "10",
      date: "November 14, 2023",
      day: "Tuesday",
      name: "World Diabetes Day",
    },
    {
      key: "11",
      date: "December 25, 2023",
      day: "Monday",
      name: "Merry Christmas",
    },
  ];

  // Determine if a record should have the blue left border
  const isRecent = (key: string) => ["8", "9", "10", "11"].includes(key);

  return (
    <>
    <div className="p-6 min-h-screen">
        <Button
          className="btn-1"
          icon={<FaPlus />}
          onClick={() => {
             alert("hoaihr");
          }}         >
          Add New Holiday
        </Button>    
      {/* Holiday Table */}
      <div className="w-full mb-4">
        {/* Table Header */}
        <div className="grid grid-cols-4 border-b pb-2 text-gray-500">
          <div className="py-2">Date</div>
          <div className="py-2">Day</div>
          <div className="py-2">Holiday Name</div>
          <div className="py-2"></div>
        </div>

        {/* Table Rows */}
        {holidayData.map((holiday) => (
          <div
            key={holiday.key}
            className={`grid grid-cols-4 border-b hover:bg-gray-50 ${
              isRecent(holiday.key) ? "border-l-4 border-indigo-500 pl-2" : ""
            }`}
          >
            <div className="py-4 text-gray-500">{holiday.date}</div>
            <div className="py-4 text-gray-500">{holiday.day}</div>
            <div className="py-4 text-gray-500">{holiday.name}</div>
            <div className="py-4 flex justify-end">
              <button className="text-red-500">
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between mt-4">
        {/* View Toggle */}
        <div className="flex items-center space-x-6">
          <button
            className={`flex items-center ${
              viewType === "upcoming" ? "text-indigo-500" : "text-gray-500"
            }`}
            onClick={() => setViewType("upcoming")}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                viewType === "upcoming" ? "bg-indigo-500" : "bg-gray-300"
              } mr-2`}
            ></div>
            Upcoming
          </button>
          <button
            className={`flex items-center ${
              viewType === "past" ? "text-indigo-500" : "text-gray-500"
            }`}
            onClick={() => setViewType("past")}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                viewType === "past" ? "bg-indigo-500" : "bg-gray-300"
              } mr-2`}
            ></div>
            Past Holidays
          </button>
        </div>

        {/* Pagination */}
        <div className="flex items-center">
          <button className="flex items-center justify-center border border-gray-200 rounded p-2 text-gray-400">
            <FaChevronLeft size={16} />
          </button>
          <div className="flex mx-2 space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                  currentPage === page
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "border-gray-200 text-gray-500"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center justify-center border border-gray-200 rounded p-2 text-gray-400">
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default HolidayCalendar;
