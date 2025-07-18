import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
const AdminDashboard = () => {
  return (
    <div className="h-screen w-full p-10 ">
      <Header />    
      <div className="mt-10 ml-[120px] w-[80%] bg-slate-800 rounded-xl p-8">
      <CreateTask/>
      <AllTask/>
       </div>

    </div>
  );
};

export default AdminDashboard;
