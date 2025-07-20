import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
const TaskList = ({ data, onAccept }) => {
  return (
    <div
      id="tasklist"
      className="mt-10 h-[55%] w-full overflow-x-auto py-5  rounded-xl flex items-center justify-start gap-5 flex-nowrap"
    >
      {data.tasks.map((elem, idx) => {
        // Use a unique key for each task (title+date+idx)
        const taskKey = `${elem.taskTitle}-${elem.taskDate}-${idx}`;
        if (elem.active) {
          return (
            <AcceptTask key={taskKey} data={elem} onStatusChange={onAccept} />
          );
        }
        if (elem.newTask) {
          return <NewTask key={taskKey} data={elem} onAccept={onAccept} />;
        }
        if (elem.completed) {
          return <CompleteTask key={taskKey} data={elem} />;
        }
        if (elem.failed) {
          return <FailedTask key={taskKey} data={elem} />;
        }
        return null;
      })}
    </div>
  );
};

export default TaskList;
