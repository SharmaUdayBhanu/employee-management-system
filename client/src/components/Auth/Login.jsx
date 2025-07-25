import React, { useState } from "react";

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    // Handle login logic here
    handleLogin(email , password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form onSubmit={formHandler} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
              placeholder="e@e.com"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
              placeholder="123"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;