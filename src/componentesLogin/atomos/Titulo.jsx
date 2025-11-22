function Titulo({ children, className = '' }) {
    const baseStyles = 'text-3xl font-bold text-gray-800 text-center mb-8';
    return (
        <h2 className={className || baseStyles}>{children}</h2>
    );
}
export default Titulo;