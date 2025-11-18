import Input from "../atomos/Input";
import Span from "../atomos/Span";
import { useNavigate } from "react-router-dom";

function LoginFields({ email, password, onChange }) {
    const navigate = useNavigate();
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
                    required
                />
            </div>
            <div>
                <Span className="block text-sm font-medium text-gray-700 mb-1">Contraseña</Span>
                <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => onChange('password', e.target.value)}
                    required
                />
            </div>
        </div>
    );
}

export default LoginFields;