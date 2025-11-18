
function Button({ type = 'button', onClick,children, className = '', disabled = false,}) {
      const baseStyles =
    "px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed justify-content: center;";
    return (
        <button type={type} onClick={onClick}  className={`${baseStyles} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;