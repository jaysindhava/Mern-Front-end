// components/ProjectDropdown.js
import React from 'react';
import DropdownMenu from './DropdownMenu';

const ProjectDropdown = ({ project, onEdit, onDelete }) => {
  const items = [
    { label: 'Edit Project', onClick: () => onEdit(project) },
    { label: 'Delete Project', onClick: () => onDelete(project.id) },
  ];

  return <DropdownMenu title="Options" items={items} />;
};

export default ProjectDropdown;
