// components/Sidebar.js
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AddProjectModal from "./AddProjectModal";

// Import your logo images
import dashboardLogo from "./dashboard.webp";
import projectsLogo from "./project.png";
import tasksLogo from "./task.png";
import settingsLogo from "./set.png";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get("http://localhost:9000/projects")
      .then((res) => setProjects(res.data))
      .catch(() => toast.error("Failed to load projects"));
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <aside className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-2xl">
        {/* Sidebar header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-wide">Menu</h2>
          <p className="text-sm text-blue-200 mt-1">Manage your projects & tasks</p>
        </div>
        <ul className="space-y-6">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <img src={dashboardLogo} alt="Dashboard" className="w-6 h-6 mr-3" />
              <span className="font-medium text-lg">Dashboard</span>
            </NavLink>
          </li>
          {/* Projects Dropdown */}
          <li>
            <button
              onClick={() => setShowProjects((prev) => !prev)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none"
            >
              <div className="flex items-center">
                <img src={projectsLogo} alt="Projects" className="w-6 h-6 mr-3" />
                <span className="font-medium text-lg">Projects</span>
              </div>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${showProjects ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showProjects && (
              <ul className="mt-2 ml-8 space-y-3">
                {/* View Projects Option */}
                <li>
                  <button
                    onClick={() => navigate("/projects")}
                    className="w-full text-left p-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    View Projects
                  </button>
                </li>
                {/* Individual projects */}
                {projects.length > 0 &&
                  projects.map((project) => (
                    <li key={project.id}>
                      <button
                        onClick={() => navigate(`/${project.id}`)}
                        className="w-full text-left p-2 rounded-lg hover:bg-blue-900 transition-colors"
                      >
                        {project.title}
                      </button>
                    </li>
                  ))}
                {/* Create New Project Option */}
                <li className="mt-2">
                  <button
                    onClick={handleOpenModal}
                    className="w-full text-left p-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition-colors shadow-md"
                  >
                    + Create New Project
                  </button>
                </li>
              </ul>
            )}
          </li>
          {/* Tasks Dropdown */}
          <li>
            <button
              onClick={() => setShowTasks((prev) => !prev)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none"
            >
              <div className="flex items-center">
                <img src={tasksLogo} alt="Tasks" className="w-6 h-6 mr-3" />
                <span className="font-medium text-lg">Tasks</span>
              </div>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${showTasks ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showTasks && (
              <ul className="mt-2 ml-8 space-y-3">
                <li>
                  <NavLink
                    to="/tasks/my-tasks"
                    className="block p-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    My Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tasks/team-tasks"
                    className="block p-2 rounded-lg hover:bg-blue-900 transition-colors"
                  >
                    Team Tasks
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Settings */}
          <li>
            <NavLink
              to="/settings"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <img src={settingsLogo} alt="Settings" className="w-6 h-6 mr-3" />
              <span className="font-medium text-lg">Settings</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Create Project Modal */}
      <AddProjectModal isModalOpen={isModalOpen} closeModal={handleCloseModal} />
    </>
  );
};

export default Sidebar;