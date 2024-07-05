import React, { useEffect, useRef, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
// const getstatuscolor = (status) => {
//   switch (status) {
//     case "todo":
//       return "bg-gray-200";
//     case "inprogress":
//       return "bg-blue-200";
//     case "completed":
//       return "bg-green-200";
//     default:
//       return "";
//   }
// };

const Task = ({ listtask, tasks, setTasks, setActiveCard }) => {
  const [editingTask, setEditingTask] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (editingTask) {
      inputRef.current.focus();
    }
  }, [editingTask]);
  const handleDeleteTask = (id) => {
    const afterdeletiontask = tasks.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(afterdeletiontask));
    setTasks(afterdeletiontask);
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
  };

  const handleSaveEdit = (id) => {
    //change specic one

    let duplicationCheck = tasks.some((task) => {
      return (
        task.id !== id &&
        task.name.toLowerCase().trim() === editingTask.name.toLowerCase().trim()
      );
    });
    const characterRegex = /^(?=.*[a-zA-Z]).+$/;

    if (duplicationCheck) {
      toast.error("Task  already exists.");
       return
    } else if (editingTask.name.trim().length < 3) {
      toast.error("Task must be at least 3 characters long.");
      return
    } else if (editingTask.name.length >= 40) {
      toast.error("Task  must be less than 40 characters.");
      return
    } else if (!characterRegex.test(editingTask.name)) {
      toast.error("Task contain at least one letter.");
      return
    }

    const editedTask = tasks.map((task) =>
      task.id === id ? { ...editingTask } : task
    );
    //set all tasks into stae
    setTasks(editedTask);
    localStorage.setItem("tasks", JSON.stringify(editedTask));
    setEditingTask(null);
  };

  const handlClosEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="cursor-grab">
      {listtask &&
        listtask.length > 0 &&
        listtask.map((task, index) => (
          <div
            draggable
            onDragStart={() => setActiveCard(task.id)}
            onDragEnd={() => setActiveCard(null)}
            key={index}
            className={` task-card flex items-center justify-between p-2 rounded mb-4 border round}`}
          >
            {editingTask && editingTask.id === task.id ? (
              <div className="flex items-center p-3 w-full justify-between">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveEdit(editingTask.id);
                    }
                  }}
                  ref={inputRef}
                  type="text"
                  value={editingTask.name}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      name: e.target.value,
                    })
                  }
                  className=" border-none outline-none bg-transparent"
                />
                <div>
                  <button
                    onClick={handlClosEdit}
                    className=" items-end justify-end cursor-pointer"
                  >
                    <X />
                  </button>
                </div>
              </div>
            ) : (
              //  task details
              <>
                <p className={`p-2 rounded mb-4 `}>{task.name}</p>
                <div>
                  {task.status !== "completed" && (
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="cursor-pointer"
                    >
                      <Edit2 size={25} />
                    </button>
                  )}

                  <button
                    
                    onClick={() => handleDeleteTask(task.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 size={25} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default Task;
