// App.js
import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import Task from "./components/Task";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";


// Wrap protected routes with your layout
const ProtectedRoutes = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

function App() {
  return (
    <>
      <Toaster position="top-right" gutter={8} />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<LoginForm onLogin={(data) => console.log("Login data:", data)} />}
        />
        <Route
          path="/signup"
          element={<SignupForm onSignup={(data) => console.log("Signup data:", data)} />}
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:projectId" element={<Task />} />
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center w-full pt-10">
                <img src="./image/welcome.svg" className="w-5/12" alt="Welcome" />
                <h1 className="text-lg text-gray-600">
                  Select or create a new project
                </h1>
              </div>
            }
          />
          {/* Redirect any unknown path to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
