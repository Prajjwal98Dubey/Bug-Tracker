import { useState } from "react";
import Task from "../components/Task";
import DisplayTask from "../components/DisplayTask";

const Dashboard = () => {
  const userDetails = JSON.parse(localStorage.getItem("tira-auth"));
  const [showTaskModal, setShowTaskModal] = useState(false);
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between items-center py-2 text-3xl font-bold w-full h-full px-10">
          <div className="flex justify-center items-center">Tira Tracker</div>
          <div className="flex justify-center items-center">
            <div className="w-fit h-fit hover:border hover:border-blue-500 rounded-full flex justify-center items-center">
              <img
                src={userDetails.userImage}
                alt="user_image"
                className="w-[45px] h-[45px] rounded-full border border-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center py-2 px-10">
          <button
            className="w-fit h-fit py-2 px-8 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer text-xl font-bold flex justify-center items-center"
            onClick={() => setShowTaskModal(true)}
          >
            + Create
          </button>
        </div>
        <div>
          <DisplayTask />
        </div>
      </div>
      {showTaskModal && <Task setShowTaskModal={setShowTaskModal} />}
    </>
  );
};

export default Dashboard;
