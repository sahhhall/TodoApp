import React, { useState } from "react";
import getstatuscolor from "../../utils/getstatuscolor";
import Task from "./Task";

const Section = ({ status, listtask, setTasks, tasks ,setActiveCard, onDrop}) => {
  const handleDrop = (e) => {
    
    onDrop(status);
  };

  const handleDragOver = (e) => {
    e.preventDefault()
  };
  return (
    <div className="container"   onDrop={handleDrop} onDragOver={handleDragOver}>
      <Header status={status} />
      <div   className="max-h-80 overflow-auto">
        <Task  onDrop={onDrop} setActiveCard= {setActiveCard} listtask={listtask} tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

const Header = ({ status }) => {
  return (
    <div
      // style={{ background: getstatuscolor(status) }}
      className={`bg-black  font-bold text-center border rounded-md text-white px-2 py-2`}
    >
      <span className="tracking-widest font-bold">{status}</span>
    </div>
  );
};

export default Section;
