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
        ? "grid grid-cols-1 gap-4 h-full overflow-y-auto p-2 md:flex md:flex-row md:items-start md:gap-5 md:overflow-x-auto md:h-[55%] md:p-0 md:w-full md:min-w-0"
        : "grid grid-cols-1 gap-4 p-2 md:flex md:flex-row md:items-start md:gap-5 md:overflow-x-auto md:h-[55%] md:p-0 md:w-full md:min-w-0"
      }
      style={{width: '100%'}}
    >
      {data.tasks.map((elem, idx) => (
        <div key={idx} className="w-full md:w-[300px] flex-shrink-0">
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
