import { useEffect, useState } from "react";
import Task from "../components/Task";
import DisplayTask from "../components/DisplayTask";
import Navbar from "../components/Navbar";
import ManagerDashboard from "../components/ManagerDashboard";
import FilterComp from "../components/FilterComp";

const Dashboard = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMyTasks = () => {
      let currDeveloperTasks = [];
      if (localStorage.getItem("all-tasks")) {
        let allTasks = JSON.parse(localStorage.getItem("all-tasks")).filter(
          (task) =>
            task.assign === JSON.parse(localStorage.getItem("tira-auth")).userId
        );
        currDeveloperTasks = [...allTasks];
      }
      setTasks([...currDeveloperTasks]);
      setIsLoading(false);
    };
    getMyTasks();
  }, []);

  if (
    JSON.parse(localStorage.getItem("tira-auth")).userRole.toLowerCase() ==
    "manager"
  )
    return <ManagerDashboard />;

  return (
    <>
      <div className="w-full h-full">
        <Navbar />
        <div className="flex justify-start items-center py-2 px-10">
          <button
            className="w-fit h-fit py-2 px-8 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer text-xl font-bold flex justify-center items-center"
            onClick={() => setShowTaskModal(true)}
          >
            + Create
          </button>
        </div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center text-xl font-bold">
            Loading...
          </div>
        ) : (
          <>
            <FilterComp
              tasks={tasks}
              setTasks={setTasks}
              userRole="developer"
            />
            <div className="px-8 py-2">
              <DisplayTask
                tasks={tasks}
                setTasks={setTasks}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
      </div>
      {showTaskModal && (
        <Task
          tasks={tasks}
          setTasks={setTasks}
          setShowTaskModal={setShowTaskModal}
        />
      )}
    </>
  );
};

export default Dashboard;
