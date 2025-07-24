import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data, onAccept, vertical, theme }) => {
  return (
    <div
      id="tasklist"
      className={vertical
        ? "grid grid-cols-1 gap-4 w-full p-2 justify-items-center md:grid-cols-2 md:justify-items-stretch lg:flex lg:flex-row lg:items-stretch lg:gap-5 lg:overflow-x-auto lg:p-0 lg:w-full lg:min-w-0"
        : "grid grid-cols-1 gap-4 w-full p-2 justify-items-center md:grid-cols-2 md:justify-items-stretch lg:flex lg:flex-row lg:items-stretch lg:gap-5 lg:overflow-x-auto lg:p-0 lg:w-full lg:min-w-0"
      }
    >
      {data.tasks.map((elem, idx) => (
        <div key={idx} className="w-full max-w-[400px] md:w-auto md:max-w-none flex-shrink-0">
          {/* Render the correct task tile */}
          {elem.active ? (
            <AcceptTask data={{...elem, email: data.email}} onStatusChange={onAccept} theme={theme} />
          ) : elem.newTask ? (
            <NewTask data={{...elem, email: data.email}} onAccept={onAccept} theme={theme} />
          ) : elem.completed ? (
            <CompleteTask data={elem} theme={theme} />
          ) : elem.failed ? (
            <FailedTask data={elem} theme={theme} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default TaskList;