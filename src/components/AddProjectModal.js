// components/AddProjectModal.js
import React, { Fragment, memo, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProjectModal = ({ isModalOpen, closeModal, edit = false, id = null }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // When editing, fetch project details to pre-fill the form
  useEffect(() => {
    if (edit && isModalOpen) {
      axios
        .get(`http://localhost:9000/project/${id}`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setTitle(res.data[0].title);
            setDesc(res.data[0].description);
          }
        })
        .catch((error) => {
          toast.error('Failed to load project details');
        });
    }
  }, [isModalOpen, edit, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, description: desc };

    if (!edit) {
      axios
        .post('http://localhost:9000/project/', payload)
        .then((res) => {
          closeModal();
          // Dispatch custom event to update project list in parent components
          document.dispatchEvent(new CustomEvent('projectUpdate', { detail: { ...res.data } }));
          toast.success('Project created successfully');
          setTitle('');
          setDesc('');
        })
        .catch((error) => {
          if (error.response?.status === 422) {
            toast.error(error.response.data.details[0].message);
          } else {
            toast.error('Failed to create project');
          }
        });
    } else {
      axios
        .put(`http://localhost:9000/project/${id}`, payload)
        .then((res) => {
          closeModal();
          document.dispatchEvent(new CustomEvent('projectUpdate', { detail: { ...res.data } }));
          toast.success('Project updated successfully');
          setTitle('');
          setDesc('');
        })
        .catch((error) => {
          if (error.response?.status === 422) {
            toast.error(error.response.data.details[0].message);
          } else {
            toast.error('Failed to update project');
          }
        });
    }
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-md shadow-lg w-10/12 max-w-lg">
              <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0">
                <Dialog.Title className="text-xl font-semibold">
                  {edit ? 'Edit Project' : 'Create Project'}
                </Dialog.Title>
                <button
                  onClick={closeModal}
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
                  <label htmlFor="projectTitle" className="block text-gray-700 font-medium mb-1">
                    Title
                  </label>
                  <input
                    id="projectTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project title"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="projectDesc" className="block text-gray-700 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="projectDesc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Project description"
                    rows="5"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <BtnSecondary onClick={closeModal}>Cancel</BtnSecondary>
                  <BtnPrimary type="submit">{edit ? 'Update' : 'Save'}</BtnPrimary>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(AddProjectModal);
