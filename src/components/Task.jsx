/// create a task or bug

import { useState } from "react";
import userData from "../data/users.data.json";
import { useDispatch } from "react-redux";
import { addNewTask } from "../redux/slices/tasks.slice.js";
import { nanoid } from "nanoid";
const Task = ({ tasks, setTasks, setShowTaskModal }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    assign: "none",
    type: "none",
    endDate: "",
  });
  const dispatch = useDispatch();
  const handleTaskData = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };
  const handleSubmitTask = (e) => {
    e.preventDefault();

    // write task form data validation
    let data = { ...taskData, id: nanoid(), isOpen: true, status: "pending" };
    dispatch(addNewTask(data));
    if (
      taskData.assign === JSON.parse(localStorage.getItem("tira-auth")).userId
    ) {
      setTasks([...tasks, { ...data }]);
    }
    if (localStorage.getItem("all-tasks")) {
      let previousTasks = JSON.parse(localStorage.getItem("all-tasks"));
      localStorage.setItem(
        "all-tasks",
        JSON.stringify([...previousTasks, { ...data }])
      );
    } else {
      localStorage.setItem("all-tasks", JSON.stringify([{ ...data }]));
    }
    setShowTaskModal(false);
    setTaskData({
      title: "",
      description: "",
      priority: "",
      assign: "none",
      type: "none",
      endDate: "",
    });
  };
  const findAssignees = () => {
    let loggedInUser = JSON.parse(localStorage.getItem("tira-auth"));
    let assignees = [loggedInUser];
    let members = userData.filter((u) => u.userId === loggedInUser.userId)[0]
      .team;
    members.forEach((memId) => {
      assignees.push(userData.filter((u) => u.userId == memId)[0]);
    });
    return assignees;
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-gray-400/45 z-10">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 lg:w-[600px] lg:max-h-[500px] w-[350px] h-[500px] overflow-y-auto px-2 py-2 border border-gray-400-400 rounded-md shadow-sm shadow-gray-500 bg-[#313131]">
        <div
          onClick={() => setShowTaskModal(false)}
          className="absolute right-2 top-2 w-fit h-fit rounded-full px-1 py-1 bg-gray-500 hover:bg-gray-400 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div>
          <form onSubmit={handleSubmitTask}>
            <div className="py-1">
              <div className="lg:text-2xl text-lg font-bold flex justify-center items-center py-2 my-2">
                <p className="text-center">Create a new task or bug</p>
              </div>
              <div>
                <label htmlFor="title">
                  <div className="flex my-2">
                    <div className="lg:text-[14px] lg:w-[100px] text-[11px] w-[70px] flex justify-center items-center font-medium">
                      Title
                    </div>
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={taskData["title"]}
                        onChange={handleTaskData}
                        placeholder="enter title  of task"
                        className="lg:w-[400px] lg:h-[40px] w-[250px] h-[35px] py-2 px-1 rounded-md bg-[#313131] border border-gray-300"
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="description">
                <div className="flex my-2">
                  <div className="lg:text-[14px] lg:w-[100px] text-[11px] w-[70px] flex justify-center items-center font-medium">
                    Description
                  </div>
                  <div>
                    <textarea
                      value={taskData["description"]}
                      name="description"
                      onChange={handleTaskData}
                      placeholder="enter description  of task"
                      className="lg:w-[400px] lg:h-[100px] w-[250px] h-[70px]  p-2 resize-none rounded-md bg-[#313131] border border-gray-300"
                    ></textarea>
                  </div>
                </div>
              </label>
            </div>
            <div className="my-2">
              <label htmlFor="priority">
                <div className="flex">
                  <div className="lg:text-[14px] lg:w-[100px] text-[11px] w-[70px] flex justify-center items-center font-medium">
                    Priority
                  </div>
                  <div className="flex px-2 justify-start">
                    {["Low", "Medium", "High"].map((p, index) => (
                      <div key={index} className="flex px-2">
                        <input
                          type="radio"
                          name="priority"
                          value={p}
                          onChange={handleTaskData}
                        />
                        <div className="px-1 lg:text-[16px] text-[11px]">
                          {p}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </label>
            </div>
            <div className="my-2">
              <label htmlFor="assignee">
                <div className="flex px-2">
                  <div className="lg:text-[14px] lg:w-[100px] text-[11px] w-[70px] flex justify-center items-center font-medium">
                    Assign to
                  </div>
                  <div className="flex justify-center items-center">
                    <select
                      value={taskData["assign"]}
                      name="assign"
                      onChange={handleTaskData}
                      className="bg-[#313131] border border-gray-400 px-2 py-1 rounded-md lg:text-[16px] text-[11px]"
                    >
                      <option disabled value="none">
                        select a option
                      </option>
                      {findAssignees().map((u) => (
                        <option key={u.userName} value={u.userId}>
                          {u.userName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </label>
            </div>
            <div className="my-2">
              <label htmlFor="type">
                <div className="flex px-2">
                  <div className="lg:text-[14px] lg:w-[100px] text-[11px] w-[70px] flex justify-center items-center font-medium">
                    type
                  </div>
                  <div className="flex justify-center items-center">
                    <select
                      value={taskData["type"]}
                      name="type"
                      onChange={handleTaskData}
                      className="bg-[#313131] border border-gray-400 px-2 py-1 rounded-md lg:text-[16px] text-[11px]"
                    >
                      <option disabled value="none">
                        select a option
                      </option>
                      <option value="task">📝 task</option>
                      <option value="bug"> 🐞 bug</option>
                    </select>
                  </div>
                </div>
              </label>
            </div>
            <div className="py-1">
              <label htmlFor="date">
                <div className="flex">
                  <div className="lg:text-[14px] lg:w-[100px] text-[11px] w-[70px] flex justify-center items-center font-medium">
                    end date
                  </div>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={taskData["endDate"]}
                    onChange={handleTaskData}
                    className="bg-[#313131] px-1 py-2 rounded-md lg:text-[17px] text-[11px] border border-gray-400"
                  />
                </div>
              </label>
            </div>
            <div className="flex justify-center items-center my-2">
              <button
                type="submit"
                className="font-bold text-white bg-gradient-to-r from-blue-400 to-blue-500 w-[300px] h-[45px] rounded-md"
              >
                Done !!!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
