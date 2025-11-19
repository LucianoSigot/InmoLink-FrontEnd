import LoginFields from "../moleculas/LoginFields";
import Button from "../atomos/Button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LinkText } from "../atomos/LinkText";
function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || 'Error al iniciar sesión');
                return;
            }

            if (response.ok) {
            navigate("/");
            }
        } catch (err) {
            setError('Error de conexión: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = () => {
        setLoading(true);
        window.location.href = "http://localhost:4000/auth/google";
    };
    return (
        <div className="space-y-6">
            <LoginFields
                email={form.email}
                password={form.password}
                onChange={handleChange}
            />
            <LinkText text="¿No tienes una cuenta?" linkText="Registrate" to="/register"/>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="mx-auto block" onClick={handleSubmit}>
                {loading ? 'Cargando...' : 'Iniciar Sesion'}
            </Button>
            <Button type="submit" 
                disabled={loading} 
                className="mx-auto block" 
                imagen ="https://foroalfa.org/imagenes/ilustraciones/1204.jpg" 
                tipo="google" onClick={handleGoogleLogin}>
                    {loading ? 'Cargando...' : 'Iniciar Sesion con google'}
            </Button>
        </div>
    );
}

export default LoginForm;