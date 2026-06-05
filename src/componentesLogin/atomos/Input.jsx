function Input({ type = 'text', name, value, onChange, placeholder, className = '', disabled = false, required = false, ...rest }) {
    const baseStyles = 'w-full px-5 py-3 border-b border-gray-100 focus:border-black outline-none transition-all bg-transparent text-sm font-medium tracking-tight placeholder:text-gray-300';
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className || baseStyles}
            disabled={disabled}
            {...(required && { required })}
            {...rest}
        />
    );
}

export default Input;