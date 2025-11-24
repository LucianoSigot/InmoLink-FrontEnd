import React from 'react';

const SectionTitle = ({ children, className = '' }) => {
    return (
        <h3 className={`text-lg font-bold text-gray-800 mb-4 ${className}`}>
            {children}
        </h3>
    );
};

export default SectionTitle;
