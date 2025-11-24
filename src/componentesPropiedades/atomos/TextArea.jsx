import React from 'react';

const TextArea = ({ className = '', ...rest }) => {
    return (
        <textarea
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none flex-grow ${className}`}
            {...rest}
        />
    );
};

export default TextArea;
