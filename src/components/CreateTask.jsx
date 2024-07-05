import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const CreateTask = ({ tasks, setTasks }) => {
  const [taskError, setTaskError] = useState("");

  const validateTask = (value) => {
    let duplicationCheck = tasks?.some(
      (taskk) => taskk.name.toLowerCase().trim() === value.toLowerCase().trim()
    );
    const characterRegex = /^(?=.*[a-zA-Z]).+$/;
    if (duplicationCheck) {
      setTaskError("Task  already exists.");
    } else if (value.trim().length < 3) {
      setTaskError("Task must be at least 3 characters long.");
    } else if (value.length >= 40) {
      setTaskError("Task  must be less than 40 characters.");
    } else if (!characterRegex.test(value)) {
      setTaskError("Task contain at least one letter.");
    } else {
      setTaskError("");
    }
  };

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
    validateTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskError) return
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
      <div>
        <input
          type="text"
          className="text-xl font-semibold px-3 py-2 shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={task.name}
          placeholder="Learn Node.js..."
          style={{ borderColor: taskError ? "red" : "" }}
        />

        <button
          onClick={handleSubmit}
          className="bg-black ms-3 text-white  px-5 py-2 border rounded-md font-bold"
        >
          Create
        </button>
      </div>
      {/* {err.length > 0 && (
        <span className="text-red-500 tracking-wide ">{err}</span>
      )} */}
      {taskError && <p style={{ color: "red" }}>{taskError}</p>}
    </form>
  );
};

export default CreateTask;
