// components/Dashboard.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  ClipboardListIcon, 
  ChartBarIcon, 
  UsersIcon, 
  BellIcon, 
  SearchIcon 
} from "@heroicons/react/outline";
import AddProjectModal from "./AddProjectModal";

const stats = [
  { id: 1, label: "Total Projects", value: 8, icon: <ClipboardListIcon className="h-6 w-6 text-white" /> },
  { id: 2, label: "Pending Tasks", value: 23, icon: <ChartBarIcon className="h-6 w-6 text-white" /> },
  { id: 3, label: "Team Members", value: 12, icon: <UsersIcon className="h-6 w-6 text-white" /> },
];

const Dashboard = () => {
  const [isNewProjectModalOpen, setNewProjectModalOpen] = useState(false);

  const openNewProjectModal = () => setNewProjectModalOpen(true);
  const closeNewProjectModal = () => setNewProjectModalOpen(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, John!</h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* Quick Actions Panel on Top */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={openNewProjectModal}
            className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors text-center"
          >
            New Project
          </button>
          <NavLink
            to="/tasks"
            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors text-center"
          >
            View Tasks
          </NavLink>
          <NavLink
            to="/calendar"
            className="flex-1 sm:flex-none px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition-colors text-center"
          >
            Calendar
          </NavLink>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="flex items-center bg-white rounded-md shadow overflow-hidden">
        <div className="p-3 bg-gray-100">
          <SearchIcon className="h-6 w-6 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search projects or tasks..."
          className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg text-white transform transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:scale-105"
          >
            <div className="flex-shrink-0">{stat.icon}</div>
            <div className="ml-4">
              <p className="text-lg font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.id === 2 && (
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-800 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Productivity Chart</h2>
          <div className="h-64 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-600">Chart Placeholder</span>
          </div>
        </div>

        {/* Recent Activity / Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <p className="text-gray-700">
                <span className="font-medium">Project Alpha</span> was updated.
              </p>
              <p className="text-gray-500 text-sm">5 minutes ago</p>
            </li>
            <li className="py-3">
              <p className="text-gray-700">
                New task added in <span className="font-medium">Project Beta</span>.
              </p>
              <p className="text-gray-500 text-sm">30 minutes ago</p>
            </li>
            <li className="py-3">
              <p className="text-gray-700">
                <span className="font-medium">Team Meeting</span> scheduled for tomorrow.
              </p>
              <p className="text-gray-500 text-sm">1 hour ago</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Add Project Modal */}
      {isNewProjectModalOpen && (
        <AddProjectModal isModalOpen={isNewProjectModalOpen} closeModal={closeNewProjectModal} />
      )}
    </div>
  );
};

export default Dashboard;
