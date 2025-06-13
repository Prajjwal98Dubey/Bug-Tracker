import React, { useState } from "react";
import { convertDate } from "../helpers/formatDate";
import {
  TASK_PRIORITY_STYLE,
  TASK_STATUS_STYLE,
  TASK_TYPE_STATUS_OPTIONS,
  TASK_TYPE_STYLE,
} from "../helpers/tickets.style";
import { Pencil, Trash2 } from "lucide-react";
import EditTask from "./EditTask";

const SingleTask = ({ tasks, setTasks, details }) => {
  const [taskStatus, setTaskStatus] = useState(details.status);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleTaskStatus = (e) => {
    if (
      e.target.value.toLowerCase() === "completed" ||
      e.target.value.toLowerCase() == "closed"
    ) {
      let updatedTasks = [];
      tasks.forEach((task) => {
        if (task.id === details.id) {
          updatedTasks.push({
            ...task,
            status: task.type === "task" ? "completed" : "closed",
          });
        } else {
          updatedTasks.push(task);
        }
      });
      setTasks([...updatedTasks]);
      let localStorageAllTasksUpdate = [];
      JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
        if (task.id === details.id) {
          localStorageAllTasksUpdate.push({
            ...task,
            status: task.type === "task" ? "completed" : "closed",
          });
        } else {
          localStorageAllTasksUpdate.push({ ...task });
        }
      });
      localStorage.setItem(
        "all-tasks",
        JSON.stringify([...localStorageAllTasksUpdate])
      );
    } else if (e.target.value === "pending") {
      let updatedTasks = [];
      tasks.forEach((task) => {
        if (task.id === details.id) {
          updatedTasks.push({
            ...task,
            status: "pending",
          });
        } else {
          updatedTasks.push(task);
        }
      });
      setTasks([...updatedTasks]);
      let localStorageAllTasksUpdate = [];
      JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
        if (task.id === details.id) {
          localStorageAllTasksUpdate.push({
            ...task,
            status: "pending",
          });
        } else {
          localStorageAllTasksUpdate.push({ ...task });
        }
      });
      localStorage.setItem(
        "all-tasks",
        JSON.stringify([...localStorageAllTasksUpdate])
      );
    } else {
      let updatedTasks = [];
      tasks.forEach((task) => {
        if (task.id === details.id) {
          updatedTasks.push({
            ...task,
            status: "approval",
          });
        } else {
          updatedTasks.push(task);
        }
      });
      setTasks([...updatedTasks]);
      let localStorageAllTasksUpdate = [];
      JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
        if (task.id === details.id) {
          localStorageAllTasksUpdate.push({
            ...task,
            status: "approval",
          });
        } else {
          localStorageAllTasksUpdate.push({ ...task });
        }
      });
      localStorage.setItem(
        "all-tasks",
        JSON.stringify([...localStorageAllTasksUpdate])
      );
    }
    setTaskStatus(e.target.value);
  };
  const handleDeleteTask = (taskId) => {
    let updatedTasks = tasks.filter((task) => task.id !== taskId);
    let updatedLocalStorage =
      localStorage.getItem("all-tasks") &&
      JSON.parse(localStorage.getItem("all-tasks")).filter(
        (task) => task.id !== taskId
      );
    setTasks([...updatedTasks]);
    localStorage.setItem("all-tasks", JSON.stringify([...updatedLocalStorage]));
  };
  return (
    <>
      <div
        className={`lg:w-[400px] lg:h-[250px] w-[340px] h-[200px] relative ${
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
        <div className="flex px-1">
          <div onClick={() => handleDeleteTask(details.id)} className="px-1">
            <Trash2 size="14" className="hover:text-red-400 cursor-pointer" />
          </div>
          <div onClick={() => setShowEditModal(true)} className="px-1">
            <Pencil size="14" className="hover:text-blue-400 cursor-pointer" />
          </div>
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
      {showEditModal && (
        <EditTask
          taskData={details}
          setShowEditModal={setShowEditModal}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
    </>
  );
};

export default SingleTask;
