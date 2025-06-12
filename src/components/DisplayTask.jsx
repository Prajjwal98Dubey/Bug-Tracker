import { useSelector } from "react-redux";

const DisplayTask = () => {
  const taskSelector = useSelector((store) => store.tasks.taskList);
  return <div>
    
  </div>;
};

export default DisplayTask;
