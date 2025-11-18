function Input({ type = 'text', name, value, onChange, placeholder, className = '', disabled = false, ...rest }) {
    const baseStyles = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Ingrese ${name || type}`}
            className={className || baseStyles}
            disabled={disabled}
            {...rest}
        />
    );
}

export default Input;