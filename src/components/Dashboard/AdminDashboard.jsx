import React, { useState } from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
const AdminDashboard = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <div className={theme === "dark" ? "min-h-screen w-full p-2 md:p-10 overflow-x-auto bg-[#1C1C1C]" : "min-h-screen w-full p-2 md:p-10 overflow-x-auto bg-white"}>
      <div className="flex justify-end mb-2">
        <button
          className={theme === "dark" ? "px-4 py-2 rounded bg-gray-700 text-white flex items-center gap-2" : "px-4 py-2 rounded bg-yellow-300 text-black flex items-center gap-2"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span>{theme === "dark" ? "🌙" : "☀️"}</span>
          <span className="font-semibold">{theme === "dark" ? "Dark" : "Light"} Mode</span>
        </button>
      </div>
      <Header theme={theme} />    
      <div className={theme === "dark" ? "mt-6 md:mt-10 md:ml-[120px] w-full md:w-[80%] bg-slate-800 rounded-xl p-4 md:p-8" : "mt-6 md:mt-10 md:ml-[120px] w-full md:w-[80%] bg-gray-100 rounded-xl p-4 md:p-8"}>
      <CreateTask theme={theme}/>
      <AllTask theme={theme}/>
       </div>

    </div>
  );
};

export default AdminDashboard;
