// components/EditProjectModal.js
import React, { useState, useEffect } from 'react';
import ModalContainer from './ModalContainer';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import toast from 'react-hot-toast';

const EditProjectModal = ({ isOpen, onClose, project, onUpdateProject }) => {
  const [projectName, setProjectName] = useState('');

  // Pre-fill form when project is available
  useEffect(() => {
    if (project) {
      setProjectName(project.name);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProject({ ...project, name: projectName });
    onClose();
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-t-md border-b border-gray-200 px-6 py-4 sticky top-0 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Edit Project</h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:bg-gray-100 p-1 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="px-6 py-4">
        <div className="mb-4">
          <label htmlFor="editProjectName" className="block text-gray-700 font-medium mb-1">
            Project Name
          </label>
          <input
            id="editProjectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder=
