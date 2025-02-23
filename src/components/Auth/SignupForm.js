// components/Auth/SignupForm.js
import React, { useState } from "react";
import BtnPrimary from "../BtnPrimary";

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("team"); // Default role

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your signup API here
    onSignup({ username, email, password, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signupUsername" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="signupUsername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="signupEmail" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="signupEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="signupPassword" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="signupPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500 transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="signupRole" className="block text-gray-700 font-medium mb-1">
              Role
            </label>
            <select
              id="signupRole"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="team">Team Member</option>
            </select>
          </div>
          <BtnPrimary type="submit" className="w-full">
            Sign Up
          </BtnPrimary>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
