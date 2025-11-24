import React from 'react';

const Checkbox = ({ label, checked, onChange, className = '' }) => {
    return (
        <label className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded transition ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700 text-sm select-none">{label}</span>
        </label>
    );
};

export default Checkbox;
