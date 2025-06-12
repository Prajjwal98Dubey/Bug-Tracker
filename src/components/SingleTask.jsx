import React, { useState } from "react";
import { convertDate } from "../helpers/formatDate";

const TASK_STATUS_STYLE = {
  pending: {
    border: "border border-red-500",
    tagColor: "from-red-500 to-red-400",
    shadow: "shadow-sm shadow-red-400",
  },
  closed: {
    border: "border border-green-600",
    tagColor: "from-green-500 to-green-400",
    shadow: "shadow-sm shadow-green-400",
  },
};

const TASK_TYPE_STYLE = {
  bug: "bg-red-500 text-white border border-red-400 ",
  task: "bg-purple-500 text-white border border-purple-400 ",
};

const TASK_PRIORITY_STYLE = {
  low: "from-green-400 to-green-500 border border-green-600",
  medium: "from-amber-400 to-amber-500 border border-amber-600",
  high: "from-red-400 to-red-500 border border-red-600",
};

const TASK_TYPE_STATUS_OPTIONS = {
  task: ["completed", "pending"],
  bug: ["closed", "pending"],
};

const SingleTask = ({ details }) => {
  const [taskStatus, setTaskStatus] = useState("none");
  const handleTaskStatus = (e) => {
    setTaskStatus(e.target.value);
  };
  return (
    <div
      className={`w-[400px] h-[250px] relative ${
        TASK_STATUS_STYLE[details.status].border
      } rounded-md mx-2 my-2`}
    >
      <div
        className={`absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-[11px] font-bold rounded-[30px] bg-gradient-to-r ${
          TASK_STATUS_STYLE[details.status].tagColor
        }`}
      >
        {details.status}
      </div>
      <div className="flex justify-start items-center font-bold px-2">
        <div className="text-[18px] mt-2 mb-1">{details.title}</div>
      </div>
      <div className="flex justify-start items-center font-bold px-2 text-gray-300">
        <div className="text-[12px] my-1 h-fit">{details.description}</div>
      </div>
      <div className="flex justify-start items-center px-2 mt-1">
        <div className="flex">
          <div
            className={`${
              TASK_TYPE_STYLE[details.type]
            } text-[10px] px-3 py-[3px] font-medium rounded-md flex justify-center items-center`}
          >
            {details.type}
          </div>
          <div
            className={`ml-[2px] bg-gradient-to-r flex justify-center items-center ${
              TASK_PRIORITY_STYLE[details.priority.toLowerCase()]
            } text-[10px] px-3 py-[3px]  rounded-md font-bold`}
          >
            {details.priority}
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center px-2 mt-1 mb-1">
        <div className="text-[13px] text-gray-300 font-medium">
          Deadline at: {convertDate(details.endDate)}
        </div>
      </div>
      <div className="flex justify-start items-center px-2 mt-1">
        <div className="flex ">
          <div className="text-gray-300 text-[13px] font-medium flex justify-center items-center ">
            Update Status:{" "}
          </div>
          <div className="flex justify-center items-center ml-1">
            <select
              value={taskStatus}
              onChange={handleTaskStatus}
              className="px-2 py-1 text-[12px] bg-[#313131] rounded-md border border-gray-400"
            >
              <option value="none" disabled>
                select a option
              </option>
              {TASK_TYPE_STATUS_OPTIONS[details.type].map((t, index) => (
                <option value={t} key={index}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
