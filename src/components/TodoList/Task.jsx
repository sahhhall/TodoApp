import React from "react";
import { Trash2 } from "lucide-react";
const getstatuscolor = (status) => {
  switch (status) {
    case "todo":
      return "bg-gray-200";
    case "inprogress":
      return "bg-blue-200";
    case "completed":
      return "bg-green-200";
  }
};

const Task = ({ listtask, tasks, setTasks }) => {
  const handleDeleteTask = (id) => {
    const afterdeletiontask = tasks.filter((item) => item.id !== id);
    //need to set local storage
    localStorage.setItem("tasks", JSON.stringify(afterdeletiontask))
    setTasks(afterdeletiontask)
  };
  return (
    <div className=" cursor-grab">
      {listtask &&
        listtask.length > 0 &&
        listtask.map((task, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 rounded mb-4 ${getstatuscolor(
              task.status
            )}`}
          >
            <p
              key={index}
              className={`p-2 rounded mb-4 ${getstatuscolor(task.status)}`}
            ></p>
            {task.name}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className=" cursor-pointer "
            >
              <Trash2  size={25} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Task;
