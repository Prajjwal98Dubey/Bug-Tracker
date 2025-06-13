import { useState } from "react";
import userData from "../data/users.data.json";
const EditTask = ({ taskData, setShowEditModal, tasks, setTasks }) => {
  const [editDetails, setEditDetails] = useState({ ...taskData });
  const handleEditDetails = (e) => {
    setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    let updateTasks = [];
    let updatedLocalStorageTasks = [];

    tasks.forEach((task) => {
      if (task.id === taskData.id) {
        updateTasks.push({ ...editDetails });
      } else {
        updateTasks.push({ ...task });
      }
    });
    if (localStorage.getItem("all-tasks")) {
      JSON.parse(localStorage.getItem("all-tasks")).forEach((task) => {
        if (task.id == taskData.id) {
          updatedLocalStorageTasks.push({ ...editDetails });
        } else {
          updatedLocalStorageTasks.push({ ...task });
        }
      });
    }
    setShowEditModal(false);
    setTasks([...updateTasks]);
    localStorage.setItem(
      "all-tasks",
      JSON.stringify([...updatedLocalStorageTasks])
    );
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[600px] max-h-[500px] overflow-y-auto px-2 py-2 border border-gray-400-400 rounded-md shadow-sm shadow-gray-500 bg-[#313131]">
        <div
          onClick={() => setShowEditModal(false)}
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
          <form onSubmit={handleEditTask}>
            <div className="py-1">
              <div className="text-2xl font-bold flex justify-center items-center py-2 my-2">
                <p className="text-center">Create a new task or bug</p>
              </div>
              <div>
                <label htmlFor="title">
                  <div className="flex my-2">
                    <div className="text-[14px] w-[100px] flex justify-center items-center font-medium">
                      Title
                    </div>
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={editDetails["title"]}
                        onChange={handleEditDetails}
                        placeholder="enter title  of task"
                        className="w-[400px] h-[40px] py-2 px-1 rounded-md bg-[#313131] border border-gray-300"
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="description">
                <div className="flex my-2">
                  <div className="text-[14px] w-[100px] flex justify-center items-center font-medium">
                    Description
                  </div>
                  <div>
                    <textarea
                      value={editDetails["description"]}
                      name="description"
                      onChange={handleEditDetails}
                      placeholder="enter description  of task"
                      className="w-[400px] h-[100px]  p-2 resize-none rounded-md bg-[#313131] border border-gray-300"
                    ></textarea>
                  </div>
                </div>
              </label>
            </div>
            <div className="my-2">
              <label htmlFor="priority">
                <div className="flex">
                  <div className="text-[14px] w-[100px] flex justify-center items-center font-medium">
                    Priority
                  </div>
                  <div className="flex px-2 justify-start">
                    {["Low", "Medium", "High"].map((p, index) => (
                      <div key={index} className="flex px-2">
                        <input
                          type="radio"
                          name="priority"
                          value={p}
                          onChange={handleEditDetails}
                        />
                        <div className="px-1">{p}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </label>
            </div>
            <div className="my-2">
              <label htmlFor="assignee">
                <div className="flex px-2">
                  <div className="text-[14px] w-[100px] flex justify-center items-center font-medium">
                    Assign to
                  </div>
                  <div className="flex justify-center items-center">
                    <select
                      value={editDetails["assign"]}
                      name="assign"
                      onChange={handleEditDetails}
                      className="bg-[#313131] border border-gray-400 px-2 py-1 rounded-md"
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
                  <div className="text-[14px] w-[100px] flex justify-center items-center font-medium">
                    type
                  </div>
                  <div className="flex justify-center items-center">
                    <select
                      value={editDetails["type"]}
                      name="type"
                      onChange={handleEditDetails}
                      className="bg-[#313131] border border-gray-400 px-2 py-1 rounded-md "
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
            <div className="">
              <label htmlFor="date">
                <div className="flex">
                  <div className="text-[14px] w-[100px] flex justify-center items-center font-medium">
                    end date
                  </div>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={editDetails["endDate"]}
                    onChange={handleEditDetails}
                    className="bg-[#313131] px-1 py-2 rounded-md border border-gray-400"
                  />
                </div>
              </label>
            </div>
            <div className="flex justify-center items-center my-2">
              <button
                type="submit"
                className="font-bold text-white bg-gradient-to-r from-blue-400 to-blue-500 w-[300px] h-[45px] rounded-md"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
