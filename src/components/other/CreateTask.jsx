import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const CreateTask = ({ onTaskCreated }) => {
  const [form, setForm] = useState({
    email: "",
    taskTitle: "",
    taskDescription: "",
    taskDate: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Fetch employee
      const res = await axios.get(`${API_URL}/employees/${form.email}`);
      const employee = res.data;
      if (!employee) {
        setError("Employee not found");
        setLoading(false);
        return;
      }
      // Add new task
      const newTask = {
        taskTitle: form.taskTitle,
        taskDescription: form.taskDescription,
        taskDate: form.taskDate,
        category: form.category,
        newTask: true,
        active: false,
        completed: false,
        failed: false,
      };
      const updatedTasks = [...employee.tasks, newTask];
      // Update counts
      const oldCounts = employee.taskCounts || {
        newTask: 0,
        completed: 0,
        active: 0,
        failed: 0,
      };
      const updatedCounts = {
        ...oldCounts,
        newTask: (oldCounts.newTask || 0) + 1,
      };
      // Update employee
      const updatedEmployee = {
        ...employee,
        tasks: updatedTasks,
        taskCounts: updatedCounts,
      };
      await axios.put(
        `${API_URL}/employees/${employee.email}`,
        updatedEmployee
      );
      setForm({
        email: "",
        taskTitle: "",
        taskDescription: "",
        taskDate: "",
        category: "",
      });
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      setError("Employee not found or error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Employee Email"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        name="taskTitle"
        value={form.taskTitle}
        onChange={handleChange}
        placeholder="Task Title"
        className="border p-2 rounded w-full"
        required
      />
      <textarea
        name="taskDescription"
        value={form.taskDescription}
        onChange={handleChange}
        placeholder="Task Description"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="date"
        name="taskDate"
        value={form.taskDate}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 rounded w-full"
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

export default CreateTask;
