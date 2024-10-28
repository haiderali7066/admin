// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      alert("Incorrect username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign in to your account
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                placeholder="admin"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
        <p className="mt-2 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
