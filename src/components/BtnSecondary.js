// components/BtnSecondary.js
import React from 'react';

const BtnSecondary = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default BtnSecondary;
