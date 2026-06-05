function Span({ children, className = '', onClick }) {
    const baseStyles = 'block text-sm font-medium text-gray-700 mb-1';
    return (
        <span className={className || baseStyles}  onClick={onClick}>
            {children}
        </span>
    );
}

export default Span;