// components/Auth/LoginForm.js
import React, { useState } from "react";
import BtnPrimary from "../BtnPrimary";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your login API here
    onLogin({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="loginEmail" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="loginPassword" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <BtnPrimary type="submit" className="w-full">
            Login
          </BtnPrimary>
        </form>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex space-x-2 w-full sm:w-auto">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors">
              Login with Google
            </button>
            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md transition-colors">
              Login with GitHub
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
