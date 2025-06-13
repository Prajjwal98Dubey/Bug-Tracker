import { useEffect, useState } from "react";
import {
  TASK_PRIORITY_STYLE,
  TASK_STATUS_STYLE,
  TASK_TYPE_STYLE,
} from "../helpers/tickets.style";
import Navbar from "./Navbar";
import userData from "../data/users.data.json";
import { convertDate } from "../helpers/formatDate";
import FilterComp from "./FilterComp";

const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getManagersDashboard = () => {
      let myTeam = userData.filter(
        (u) => u.userId === JSON.parse(localStorage.getItem("tira-auth")).userId
      )[0].team;
      let allTasks = [];
      if (localStorage.getItem("all-tasks"))
        allTasks = JSON.parse(localStorage.getItem("all-tasks")).filter(
          (user) => myTeam.some((u) => u === user.assign)
        );
      setTasks([...allTasks]);
      setIsLoading(false);
    };
    getManagersDashboard();
  }, []);
  const handleAccpetApproval = (taskId) => {
    let updatedAllTasks = [];
    let updateTasks = [];
    tasks.forEach((task) => {
      if (task.id == taskId) {
        updateTasks.push({
          ...task,
          status: task.type == "task" ? "completed" : "closed",
        });
      } else {
        updateTasks.push({ ...task });
      }
    });
    JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
      if (task.id === taskId) {
        updatedAllTasks.push({
          ...task,
          status: task.type == "task" ? "completed" : "closed",
        });
      } else {
        updatedAllTasks.push({ ...task });
      }
    });
    setTasks([...updateTasks]);
    localStorage.setItem("all-tasks", JSON.stringify([...updatedAllTasks]));
  };
  const handleRejectApproval = (taskId) => {
    let updatedAllTasks = [];
    let updateTasks = [];
    tasks.forEach((task) => {
      if (task.id == taskId) {
        updateTasks.push({
          ...task,
          status: "pending",
        });
      } else {
        updateTasks.push({ ...task });
      }
    });
    JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
      if (task.id === taskId) {
        updatedAllTasks.push({ ...task, status: "pending" });
      } else {
        updatedAllTasks.push({ ...task });
      }
    });
    setTasks([...updateTasks]);
    localStorage.setItem("all-tasks", JSON.stringify([...updatedAllTasks]));
  };
  const handleAcceptReOpen = (taskId) => {
    let updatedAllTasks = [];
    let updateTasks = [];
    tasks.forEach((task) => {
      if (task.id == taskId) {
        updateTasks.push({
          ...task,
          status: "pending",
        });
      } else {
        updateTasks.push({ ...task });
      }
    });
    JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
      if (task.id === taskId) {
        updatedAllTasks.push({
          ...task,
          status: "pending",
        });
      } else {
        updatedAllTasks.push({ ...task });
      }
    });
    setTasks([...updateTasks]);
    localStorage.setItem("all-tasks", JSON.stringify([...updatedAllTasks]));
  };

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center py-2 text-xl font-bold">
        Loading ...
      </div>
    );
  return (
    <>
      <Navbar />
      <FilterComp tasks={tasks} setTasks={setTasks} userRole="manager" />
      <div className="flex flex-wrap px-6">
        {tasks.length == 0 ? (
          <div className="w-full h-full flex justify-center items-center font-bold text-xl">
            No Tasks/Bug
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`w-[400px] h-[250px] relative ${
                TASK_STATUS_STYLE[task.status].border
              } rounded-md mx-2 my-2`}
            >
              <div
                className={`absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-[11px] font-bold rounded-[30px] bg-gradient-to-r ${
                  TASK_STATUS_STYLE[task.status].tagColor
                }`}
              >
                {task.status}
              </div>
              <div className="flex justify-start items-center font-bold px-2">
                <div className="text-[18px] mt-2 mb-1">{task.title}</div>
              </div>
              <div className="flex justify-start items-center font-bold px-2 text-gray-300">
                <div className="text-[12px] my-1 h-fit">{task.description}</div>
              </div>
              <div className="flex justify-start items-center px-2 mt-1">
                <div className="flex">
                  <div
                    className={`${
                      TASK_TYPE_STYLE[task.type]
                    } text-[10px] px-3 py-[3px] font-medium rounded-md flex justify-center items-center`}
                  >
                    {task.type}
                  </div>
                  <div
                    className={`ml-[2px] bg-gradient-to-r flex justify-center items-center ${
                      TASK_PRIORITY_STYLE[task.priority.toLowerCase()]
                    } text-[10px] px-3 py-[3px]  rounded-md font-bold`}
                  >
                    {task.priority}
                  </div>
                </div>
              </div>
              <div className="flex justify-start items-center px-2 mt-1 mb-1">
                <div className="text-[13px] text-gray-300 font-medium">
                  Deadline at: {convertDate(task.endDate)}
                </div>
              </div>
              <div className="flex justify-start items-center px-2 mt-1 mb-1">
                <div className="text-[13px] text-gray-300 font-medium">
                  Assigned to:
                </div>
                <div className="text-[13px] font-bold px-1">
                  {userData.filter((u) => u.userId === task.assign)[0].userName}
                </div>
              </div>
              {task.status === "approval" && (
                <div className="flex justify-start items-center px-2 mt-1 mb-1">
                  <div className="text-[13px] text-gray-300 font-medium">
                    Approve this {task.type}:
                  </div>
                  <div className="text-[13px] font-bold px-1">
                    <button
                      onClick={() => handleAccpetApproval(task.id)}
                      className="w-fit h-fit px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 mx-1 cursor-pointer font-bold"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleRejectApproval(task.id)}
                      className="w-fit h-fit px-2 py-1 bg-red-500  rounded-md font-bold  hover:bg-red-600  cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
              {(task.status === "completed" || task.status === "closed") && (
                <div className="flex justify-start items-center px-2 mt-1 mb-1">
                  <div className="text-[13px] text-gray-300 font-medium">
                    re-open this: {task.type}:
                  </div>
                  <div className="text-[13px] font-bold px-1">
                    <button
                      onClick={() => handleAcceptReOpen(task.id)}
                      className="w-fit h-fit px-2 py-1 bg-green-500 rounded-md hover:bg-green-600 mx-1 cursor-pointer font-bold"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ManagerDashboard;
