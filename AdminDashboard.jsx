
import React, { useState } from 'react';
import { addTaskToLocalStorage } from './localstorage';

const AdminDashboard = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [taskDetails, setTaskDetails] = useState('');

  const assignTask = () => {
    if (employeeId && taskDetails) {
      addTaskToLocalStorage(employeeId, taskDetails);
      alert('Task assigned successfully!');
      setEmployeeId('');
      setTaskDetails('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Task Details:
          <textarea
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />
        </label>
      </div>
      <button onClick={assignTask}>Assign Task</button>
    </div>
  );
};

export default AdminDashboard;