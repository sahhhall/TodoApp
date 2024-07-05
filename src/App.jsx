import React, { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";

const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  return (
    <div className="flex flex-col items-center h-100">
      <h1 className="text-8xl font-extrabold mt-5 text-center mb-4">
        A simple todo list <br />
        <span>
          <span className="  ">
            manage it all
          </span>
        </span>
      </h1>
      <div className="flex mt-12 justify-center">
        <CreateTask tasks={tasks} setTasks={setTasks} />
      </div>
      <div  style={{ width: "75%" }} className="mt-6">
        <ListTask tasks={tasks} setTasks={setTasks} />
      </div >
    </div>
  );
};

export default App;
