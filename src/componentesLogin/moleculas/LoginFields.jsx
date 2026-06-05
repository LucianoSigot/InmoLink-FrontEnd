import Input from "../atomos/Input";
import Span from "../atomos/Span";


function LoginFields({ email, password, onChange }) {
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
                <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => onChange('password', e.target.value)}
                    required={false}
                />
            </div>
        </div>
    );
}

export default LoginFields;