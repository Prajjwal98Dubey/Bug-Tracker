import SingleTask from "./SingleTask";

const DisplayTask = ({ tasks, setTasks, isLoading }) => {
  // const taskSelector = useSelector((store) => store.tasks.taskList);

  return (
    <div className="flex flex-wrap">
      {!isLoading && tasks.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center text-xl font-bold">
          No task or bug yet enjoy !!!!
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <SingleTask tasks={tasks} setTasks={setTasks} details={task} />
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayTask;
