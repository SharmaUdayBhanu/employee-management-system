import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const NewTask = ({ data, onAccept }) => {
  const [task, setTask] = useState(data);
  const [loading, setLoading] = useState(false);

  const acceptHandler = async () => {
    if (!task.newTask) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/employees/${data.email}`);
      const employee = res.data;
      const taskIndex = employee.tasks.findIndex(
        (t) =>
          t.taskTitle === data.taskTitle &&
          t.taskDate === data.taskDate &&
          t.taskDescription === data.taskDescription
      );
      if (taskIndex === -1) return;
      const updatedTask = {
        ...employee.tasks[taskIndex],
        newTask: false,
        active: true,
      };
      const updatedTasks = [...employee.tasks];
      updatedTasks[taskIndex] = updatedTask;
      const oldCounts = employee.taskCounts || {
        newTask: 0,
        completed: 0,
        active: 0,
        failed: 0,
      };
      const updatedCounts = {
        ...oldCounts,
        newTask: Math.max((oldCounts.newTask || 0) - 1, 0),
        active: (oldCounts.active || 0) + 1,
      };
      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCounts: updatedCounts,
      };
      await axios.put(
        `${API_URL}/employees/${employee.email}`,
        updatedEmployee
      );
      setTask(updatedTask);
      if (onAccept) onAccept();
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  if (!task.newTask && task.active) {
    return (
      <div className="flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl p-5">
        <div className="flex justify-between items-center">
          <h3 className="bg-red-600 px-3 py-1 rounded">{task.category}</h3>
          <h4 className="text-sm">{task.taskDate}</h4>
        </div>
        <h2 className="mt-5 text-xl font-semibold">{task.taskTitle}</h2>
        <p className="text-sm mt-3">{task.taskDescription}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-green-500 py-1 px-2 text-sm rounded-sm">
            Mark as completed
          </button>
          <button className="bg-red-500 py-1 px-2 text-sm rounded-sm">
            Mark as failed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-blue-400 rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 px-3 py-1 rounded">{task.category}</h3>
        <h4 className="text-sm">{task.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-xl font-semibold">{task.taskTitle}</h2>
      <p className="text-sm mt-3">{task.taskDescription}</p>
      <div className="mt-4">
        <button
          onClick={acceptHandler}
          className="bg-green-500 p-2 rounded"
          disabled={!task.newTask || loading}
        >
          {loading ? "Accepting..." : "Accept Task"}
        </button>
      </div>
    </div>
  );
};

export default NewTask;
