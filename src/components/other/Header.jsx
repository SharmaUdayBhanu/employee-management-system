import React from "react";

const Header = ({ data }) => {
  const username = data ? data.firstName || data.name || "User" : "Admin";

  const logOutuser = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-3xl font-bold text-white">
        Hello,
        <br />
        <span className="text-4xl">{username}</span> 👋
      </h1>
      <button
        onClick={logOutuser}
        className="bg-red-500 rounded-2xl p-3 font-bold"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
