import { Funnel } from "lucide-react";
import { useState } from "react";

const FILTERS_OPTIONS = {
  "High Priority": { sortBy: "priority", keyword: "high" },
  "Medium Priority": { sortBy: "priority", keyword: "medium" },
  "Low Priority": { sortBy: "priority", keyword: "low" },
  Task: { sortBy: "type", keyword: "task" },
  Bug: { sortBy: "type", keyword: "bug" },
  Pending: { sortBy: "status", keyword: "pending" },
  Approval: { sortBy: "status", keyword: "approval" },
  Completed: { sortBy: "status", keyword: "completed" },
  Closed: { sortBy: "status", keyword: "closed" },
};

const FilterComp = ({ tasks, setTasks, userRole }) => {
  const [filterValue, setFilterValue] = useState("none");
  const [originalTasks] = useState(JSON.parse(JSON.stringify([...tasks])));
  const handleApplyFilter = (e) => {
    let { sortBy, filterKey, keyword } = JSON.parse(e.target.value);
    let filteredTasks = [];
    originalTasks.forEach((task) => {
      for (let [key, value] of Object.entries(task)) {
        if (
          key.toLowerCase() === sortBy.toLowerCase() &&
          value.toLowerCase() === keyword.toLowerCase()
        ) {
          filteredTasks.push({ ...task });
        }
      }
    });
    setTasks([...filteredTasks]);
    setFilterValue(JSON.stringify(JSON.parse(e.target.value)));
  };
  const handleClearFilters = () => {
    setTasks([...originalTasks]);
    setFilterValue("none");
  };
  return (
    <div className=" w-full h-full">
      <div className="flex lg:justify-end justify-center items-center px-4 my-1">
        <Funnel size="14" />
        <div className="flex justify-center items-center px-1">Filters</div>
        <div className="mx-[2px]">
          <select
            value={filterValue}
            onChange={handleApplyFilter}
            className="text-[13px] rounded-md px-1 py-1 bg-[#313131] border border-gray-400"
          >
            <option disabled value="none">
              select a filter
            </option>
            {Object.keys(FILTERS_OPTIONS).map((filterkey, index) => (
              <option
                key={index}
                value={JSON.stringify({
                  filterKey: filterkey,
                  ...FILTERS_OPTIONS[filterkey],
                })}
              >
                {filterkey}
              </option>
            ))}
          </select>
        </div>
        {filterValue != "none" && (
          <div
            onClick={handleClearFilters}
            className="text-[11px] font-medium px-2 py-1 rounded-md bg-purple-500 text-white hover:bg-purple-600 cursor-pointer"
          >
            clear filters
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComp;
