export const TASK_STATUS_STYLE = {
  pending: {
    border: "border border-red-500",
    tagColor: "from-red-500 to-red-400",
    shadow: "shadow-sm shadow-red-400",
  },
  closed: {
    border: "border border-green-600",
    tagColor: "from-green-500 to-green-400",
    shadow: "shadow-sm shadow-green-400",
  },
  completed: {
    border: "border border-green-600",
    tagColor: "from-green-500 to-green-400",
    shadow: "shadow-sm shadow-green-400",
  },
  approval: {
    border: "border border-teal-600",
    tagColor: "from-teal-500 to-teal-400",
    shadow: "shadow-sm shadow-teal-400",
  },
};

export const TASK_TYPE_STYLE = {
  bug: "bg-red-500 text-white border border-red-400 ",
  task: "bg-purple-500 text-white border border-purple-400 ",
};

export const TASK_PRIORITY_STYLE = {
  low: "from-green-400 to-green-500 border border-green-600",
  medium: "from-amber-400 to-amber-500 border border-amber-600",
  high: "from-red-400 to-red-500 border border-red-600",
};

export const TASK_TYPE_STATUS_OPTIONS = {
  task: ["pending", "approval"],
  bug: ["pending", "approval"],
};
