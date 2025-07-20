import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AcceptTask = ({ data, onStatusChange }) => {
  const [loading, setLoading] = useState(false);

  const updateTaskStatus = async (status) => {
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
      let updatedTask = { ...employee.tasks[taskIndex] };
      if (status === "completed") {
        updatedTask = {
          ...updatedTask,
          active: false,
          completed: true,
          failed: false,
        };
      } else if (status === "failed") {
        updatedTask = {
          ...updatedTask,
          active: false,
          completed: false,
          failed: true,
        };
      }
      const updatedTasks = [...employee.tasks];
      updatedTasks[taskIndex] = updatedTask;
      const oldCounts = employee.taskCounts || {
        newTask: 0,
        completed: 0,
        active: 0,
        failed: 0,
      };
      let updatedCounts = { ...oldCounts };
      updatedCounts.active = Math.max((oldCounts.active || 0) - 1, 0);
      if (status === "completed") {
        updatedCounts.completed = (oldCounts.completed || 0) + 1;
      } else if (status === "failed") {
        updatedCounts.failed = (oldCounts.failed || 0) + 1;
      }
      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCounts: updatedCounts,
      };
      await axios.put(
        `${API_URL}/employees/${employee.email}`,
        updatedEmployee
      );
      if (onStatusChange) onStatusChange();
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-3">{data.taskDescription}</p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 py-1 px-2 text-sm rounded-sm"
          onClick={() => updateTaskStatus("completed")}
          disabled={loading}
        >
          {loading ? "Updating..." : "Mark as completed"}
        </button>
        <button
          className="bg-red-500 py-1 px-2 text-sm rounded-sm"
          onClick={() => updateTaskStatus("failed")}
          disabled={loading}
        >
          {loading ? "Updating..." : "Mark as failed"}
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
