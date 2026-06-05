function Button({ type = 'button', onClick, children, className = '', disabled = false, imagen}) {

    const baseStyles =
        "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed justify-center";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${className}`}
            disabled={disabled}
        >
            {imagen && (
                <img
                    src={imagen}
                    alt="icon"
                    className="w-5 h-5 object-contain"
                />
            )}
            {children}
        </button>
    );
}

export default Button;
