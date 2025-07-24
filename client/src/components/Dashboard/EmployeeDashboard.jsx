import React, { useState, useEffect } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api";

const EmployeeDashboard = ({ data }) => {
  const [employee, setEmployee] = useState(data);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/employees/${data.email}`);
        setEmployee(res.data);
      } catch (err) {
        setEmployee(data);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
    // eslint-disable-next-line
  }, [data.email, refreshKey]);

  const handleAccept = () => setRefreshKey((prev) => prev + 1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div
      className={
        theme === "dark"
          ? "p-2 md:p-10 bg-[#1C1C1C] min-h-screen overflow-x-auto"
          : "p-2 md:p-10 bg-white min-h-screen overflow-x-auto"
      }
    >
      <div className="flex justify-end mb-2">
        <button
          className={
            theme === "dark"
              ? "px-4 py-2 rounded bg-gray-700 text-white flex items-center gap-2"
              : "px-4 py-2 rounded bg-yellow-300 text-black flex items-center gap-2"
          }
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span>{theme === "dark" ? "🌙" : "☀️"}</span>
          <span className="font-semibold">
            {theme === "dark" ? "Dark" : "Light"} Mode
          </span>
        </button>
      </div>
      <Header data={employee} theme={theme} />
      <TaskListNumbers data={employee} theme={theme} />
      <div className="w-full mt-4 md:mt-10 h-[60vh] md:h-[55vh] overflow-y-auto rounded-xl bg-transparent">
        <TaskList
          data={employee}
          onAccept={handleAccept}
          vertical
          theme={theme}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
