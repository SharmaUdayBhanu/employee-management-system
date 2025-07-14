import React from 'react';
import Header from '../other/Header';
import { FiArrowLeft } from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="h-screen w-full p-10">
      <Header />
      <div className="bg-slate-900 mt-10 ml-[120px] w-[80%] rounded-xl p-8">
        <div className="flex items-center mb-6">
          <button className="rounded-full bg-black p-2 mr-2">
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Create Task</h1>
        </div>
        <form className="space-y-5">
          <div>
            <h3 className="mb-1">Task Title</h3>
            <input
              type="text"
              placeholder="Make a UI Design"
              className="w-full bg-transparent border border-slate-600 rounded-md p-2 placeholder-slate-400"
            />
          </div>

          <div>
            <h3 className="mb-1">Description</h3>
            <input
              type="text"
              placeholder="Detailed description of task"
              className="w-full bg-transparent border border-slate-600 rounded-md p-2 placeholder-slate-400"
            />
          </div>

          <div>
            <h3 className="mb-1">Date</h3>
            <input
              type="date"
              className="w-full bg-transparent border border-slate-600 rounded-md p-2 text-white"
            />
          </div>

          <div>
            <h3 className="mb-1">Assign To</h3>
            <input
              type="text"
              placeholder="Name of team member"
              className="w-full bg-transparent border border-slate-600 rounded-md p-2 placeholder-slate-400"
            />
          </div>

          <div>
            <h3 className="mb-1">Category</h3>
            <input
              type="text"
              placeholder="Design, Development etc"
              className="w-full bg-transparent border border-slate-600 rounded-md p-2 placeholder-slate-400"
            />
          </div>

          <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-slate-700 transition duration-200">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
