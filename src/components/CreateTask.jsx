import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });
  const handleChange = (event) => {
    setTask((prevtasks) => ({
      ...prevtasks,
      id: uuidv4(),
      name: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.name.trim() < 3) {
      alert("please atlead");
      return;
    }
    if (task.name.length >= 20) {
      alert("not mroe thatn 20 letters");
      return;
    }
    setTasks((prev) => {
      if (prev) {
        let list = [...prev, task];
        localStorage.setItem("tasks", JSON.stringify(list));
        return list;
      } else {
        let list = [task];
        localStorage.setItem("tasks", JSON.stringify(list));
        return list;
      }
    });
    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-xl font-semibold px-3 py-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleChange}
        value={task.name}
      />

      <button
        onClick={handleSubmit}
        className="bg-black ms-3 text-white  px-5 py-2 border rounded-md font-bold"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTask;
