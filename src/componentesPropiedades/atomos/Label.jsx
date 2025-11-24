import React from 'react';

const Label = ({ children, className = '', ...rest }) => {
    return (
        <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} {...rest}>
            {children}
        </label>
    );
};

export default Label;
