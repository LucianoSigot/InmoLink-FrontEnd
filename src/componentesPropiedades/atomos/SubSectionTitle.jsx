import React from 'react';

const SubSectionTitle = ({ children, className = '' }) => {
    return (
        <h4 className={`font-bold text-blue-600 mb-3 capitalize border-b border-gray-200 pb-2 ${className}`}>
            {children}
        </h4>
    );
};

export default SubSectionTitle;
