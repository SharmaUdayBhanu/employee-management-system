import React, { useState, useEffect } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const EmployeeDashboard = ({ data }) => {
  const [employee, setEmployee] = useState(data);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

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
    <div className="p-10 bg-[#1C1C1C] h-screen ">
      <Header data={employee} />
      <TaskListNumbers data={employee} />
      <TaskList data={employee} onAccept={handleAccept} />
    </div>
  );
};

export default EmployeeDashboard;
