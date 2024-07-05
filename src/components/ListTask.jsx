import React, { useEffect, useState } from "react";
import Section from "./TodoList/Section";

const ListTask = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setClosed] = useState([]);
  const [activecard, setActiveCard] = useState(null);
  const onDrop = (status) => {
    let d = completed.some((s) => s.id === activecard)
    if (d) console.log("fuck you")
    console.log(status,"hiiii")
    const updatedTasks = tasks.map(task =>
      task.id === activecard ? { ...task, status: status } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setActiveCard(null);
  };
  useEffect(() => {
    const todos = tasks?.filter((task) => task.status === "todo");
    const inProgress = tasks?.filter((task) => task.status === "inprogress");
    const closed = tasks?.filter((task) => task.status === "completed");

    setTodos(todos);
    setInProgress(inProgress);
    setClosed(closed);
  }, [tasks]);
  const getTasksByStatus = (status) => {
    switch (status) {
      case "todo":
        return todos;
      case "inprogress":
        return inProgress;
      case "completed":
        return completed;
      default:
        return [];
    }
  };
  const status = ["todo", "inprogress", "completed"];
  return (
    <div className="flex gap-7 justify-between  ">
      {status.map((status, index) => (
        <Section
          key={index}
          status={status}
          listtask={getTasksByStatus(status)}
          tasks={tasks}
          setTasks={setTasks}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
};

export default ListTask;
