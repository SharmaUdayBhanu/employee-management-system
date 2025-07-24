import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api";

const AcceptTask = ({ data, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("accepted"); // accepted, completed, failed
  const [success, setSuccess] = useState("");

  const updateTaskStatus = async (statusType) => {
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
      if (statusType === "completed") {
        updatedTask = {
          ...updatedTask,
          active: false,
          completed: true,
          failed: false,
        };
      } else if (statusType === "failed") {
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
      if (statusType === "completed") {
        updatedCounts.completed = (oldCounts.completed || 0) + 1;
      } else if (statusType === "failed") {
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
      setStatus(statusType);
      setSuccess(
        statusType === "completed"
          ? "Task marked as completed!"
          : "Task marked as failed!"
      );
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  let bgColor = "bg-red-500";
  if (status === "completed") bgColor = "bg-green-300";
  if (status === "failed") bgColor = "bg-orange-400";

  return (
    <div className={`flex-shrink-0 h-full w-[300px] ${bgColor} rounded-xl p-5`}>
      <div className="flex justify-between items-center">
        <h3 className="bg-white text-red-600 px-3 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-3">{data.taskDescription}</p>
      {success && (
        <div className="text-green-700 font-semibold mt-2">{success}</div>
      )}
      {status === "accepted" && (
        <div className="flex justify-between mt-4">
          <button
            className="bg-white text-green-600 py-1 px-2 text-sm rounded-sm border border-green-600"
            onClick={() => updateTaskStatus("completed")}
            disabled={loading}
          >
            {loading ? "Updating..." : "Mark as completed"}
          </button>
          <button
            className="bg-white text-red-600 py-1 px-2 text-sm rounded-sm border border-red-600"
            onClick={() => updateTaskStatus("failed")}
            disabled={loading}
          >
            {loading ? "Updating..." : "Mark as failed"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AcceptTask;
