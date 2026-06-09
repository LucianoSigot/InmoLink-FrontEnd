import { useState } from 'react';
import Input from "../atomos/Input";
import Span from "../atomos/Span";

function LoginFields({ email, password, onChange }) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
        <div className="space-y-4">
            <div>
                <Span className="block text-sm font-medium text-gray-700 mb-1">Email</Span>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Ingrese su email"
                    onChange={(e) => onChange('email', e.target.value)}
                    required={false}
                />
            </div>
            <div>
                <Span className="block text-sm font-medium text-gray-700 mb-1">Contraseña</Span>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => onChange('password', e.target.value)}
                        required={false}
                        className="w-full pr-12 px-5 py-3 border-b border-gray-100 focus:border-black outline-none transition-all bg-transparent text-sm font-medium tracking-tight placeholder:text-gray-300"
                    />
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 rounded"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        aria-pressed={showPassword}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                                <path fill="currentColor" d="M12 5c-7 0-9.9 5.67-10 5.82a1 1 0 0 0 0 .36C2.1 12.33 5 18 12 18s9.9-5.67 10-5.82a1 1 0 0 0 0-.36C21.9 10.67 19 5 12 5Zm0 11a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                                <path fill="currentColor" d="M12 5c-7 0-9.9 5.67-10 5.82a1 1 0 0 0 0 .36C2.1 12.33 5 18 12 18a9.45 9.45 0 0 0 4.77-1.17l1.62 1.62a1 1 0 1 0 1.42-1.42l-14-14a1 1 0 1 0-1.42 1.42l1.46 1.46A9.45 9.45 0 0 0 2 10.18C2.1 10.33 5 16 12 16a9.45 9.45 0 0 0 4.77-1.17l1.62 1.62a1 1 0 1 0 1.42-1.42l-1.62-1.62A9.45 9.45 0 0 0 22 10.18C21.9 10.03 19 5 12 5Zm0 6a3 3 0 0 0-3 3 3.06 3.06 0 0 0 .37 1.45l4.08 4.08A3 3 0 0 0 12 11Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginFields;