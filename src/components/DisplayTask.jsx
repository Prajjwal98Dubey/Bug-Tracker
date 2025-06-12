import { useSelector } from "react-redux";
import SingleTask from "./SingleTask";

const DisplayTask = () => {
  const taskSelector = useSelector((store) => store.tasks.taskList);
  return (
    <div className="flex flex-wrap">
      {taskSelector.length > 0 &&
        taskSelector.map((task) => (
          <div key={task.id}>
            <SingleTask details={task} />
          </div>
        ))}
    </div>
  );
};

export default DisplayTask;
