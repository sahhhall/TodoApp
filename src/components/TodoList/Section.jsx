import React, { useState } from "react";
import getstatuscolor from "../../utils/getstatuscolor";
import Task from "./Task";

const Section = ({ status, listtask, setTasks, tasks }) => {
  return (
    <div className="container">
      <Header status={status} />
      <div className="max-h-80 overflow-auto">
        <Task listtask={listtask} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

const Header = ({ status }) => {
  return (
    <div
      style={{ background: getstatuscolor(status) }}
      className={`tracking-widest font-bold text-center border rounded-md text-white px-2 py-2`}
    >
      <span>{status}</span>
    </div>
  );
};

export default Section;
