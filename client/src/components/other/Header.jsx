import React from "react";

const Header = ({ data, theme }) => {
  const username = data ? data.firstName || data.name || "User" : "Admin";

  const logOutuser = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0">
      <h1 className={theme === "dark" ? "text-2xl sm:text-3xl font-bold text-white" : "text-2xl sm:text-3xl font-bold text-black"}>
        Hello,
        <br />
        <span className={theme === "dark" ? "text-3xl sm:text-4xl text-white" : "text-3xl sm:text-4xl text-black"}>{username}</span> 👋
      </h1>
      <button
        onClick={logOutuser}
        className="bg-red-500 rounded-2xl p-3 font-bold w-full sm:w-auto text-white"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
